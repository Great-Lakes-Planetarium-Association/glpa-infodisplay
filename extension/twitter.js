
// Load the NodeCG context
const nodecg = require('./util/nodecg-api-context').get();

/**
 * Twemoji object
 * @const
 */
const twemoji = require('twemoji');

// Get Conference values
var conference = nodecg.Replicant("conference");
var timezone = conference.value.timezone;

// Load variables from bundle
const confHashtag = conference.value.twitter.hashtag;
const tweet_display_time = nodecg.bundleConfig.twitter.tweet_display_time * 1000;

// Configure a Twitter object
var Twitter = require('twitter');
var client = new Twitter
	({
		consumer_key: nodecg.bundleConfig.twitter.APIKey,
		consumer_secret: nodecg.bundleConfig.twitter.APISecret,
		access_token_key: nodecg.bundleConfig.twitter.AccessToken,
		access_token_secret: nodecg.bundleConfig.twitter.AccessSecret
	});

// Listen for requests to update twitter
nodecg.listenFor('updateTwitter', message => {
	updateTweetCollection();
});

/**
 * Node CG Replicant storing the formatted tweet currently showing on the front side UI
 * @var
 */
var activeTweet = nodecg.Replicant('activeTweet');

// Variable to store JSON response from Twitter containing tweet data in
var twitterResponseData;

/**
 * Get a tweets within a collection.
 * Downloads a JSON document with information about tweets which have been curated within a Twitter collection timeline.
 * @param {!number} collection_id=nodecg.bundleConfig.twitter.collection_id
 */
function updateTweetCollection(collection_id = nodecg.bundleConfig.twitter.collection_id) {
	var params =
	{
		id: "custom-" + collection_id,
		tweet_mode: 'extended'
	};

	nodecg.log.info('[twitter]: Obtaining a new list of tweets');
	client.get('collections/entries', params, function (error, data, response) {
		if (!error) {
			twitterResponseData = data.objects
			nodecg.log.info('[twitter] New tweets obtained');
		}
	});	
	setTimeout(updateTweetCollection, nodecg.bundleConfig.twitter.poll_interval * 60 * 1000);
}

/**
 * Returns a formatted object containing data from a Twitter tweet object passed to it
 * @type {Object}
 * @param {*} tweetObj 
 * @param {*} userObj 
 */
function format_tweet(tweetObj) {
	var user = twitterResponseData.users[tweetObj.user.id_str];
	var tweet = {
		id_str: tweetObj.id_str,
		formatted_text: tweetObj.full_text,
		created_at: new Date(Date.parse(tweetObj.created_at.replace(/( \+)/, ' UTC$1'))).toLocaleString("en-us", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', "timeZone": timezone }),
		name: user.name,
		screen_name: "@" + user.screen_name,
		avatar: user.profile_image_url
	}
	
	// Determine the layout (0, 1, or 2+ media elements)
	if (tweetObj.entities.media) {
		switch (tweetObj.entities.media.length) {
			case 1:
				tweet.layout = "tweetLayout1Up";
				break;
			default:
				tweet.layout = "tweetLayout2Up";
				break;
		};
	} else {
		tweet.layout = "tweetLayoutTextOnly";
	};
	
	// Add media if present
	if (tweetObj.entities.media) {
		tweet.image = {
			media_url: tweetObj.entities.media[0].media_url,
			sizes: tweetObj.entities.media[0].sizes
		};		
	}
	// Replace emoji codes in full_text with emoji images
	tweet.formatted_text = twemoji.parse(tweet.formatted_text);

	// Replace newlines with a space
	tweet.formatted_text = tweet.formatted_text.replace(/\n/ig, ' ');

	// Add HTML span tag around text matching the conference hashtag
	tweet.formatted_text = tweet.formatted_text.replace(RegExp(confHashtag, "ig"), '<span class="hashtag-official-highlight">' + confHashtag + '</span>');

	// Add HTML span tag around text matching a general hashtag for Twitter
	let regex = new RegExp(`(?!${confHashtag})(#\\w*)`, "ig");
	tweet.formatted_text = tweet.formatted_text.replace(regex, '<span class="hashtag-general-highlight">$&</span>');

	// Add HTML span tag around text matching a twitter handle
	tweet.formatted_text = tweet.formatted_text.replace(RegExp(/(@\w{1,15})/, "ig"), '<span class="handle-highlight">$&</span>');

	// Remove the link to the tweet
	tweet.formatted_text = tweet.formatted_text.replace(/https:\/\/t.co\/\S+/, '');

	// Remove '_normal' and '_bigger' from profile URL so we don't have nasty tiny resolution sizes
	tweet.avatar = tweet.avatar.replace(/_bigger|_normal/g, '');

	// Send data to the replicant
	return tweet;
};


/**
 * Cycles to the next tweet available in the collection list
 */
function cycleTweet() {

	// This function works by looking at the list of tweets returned by Twitter.
	// It loops through each tweet by using the index of the array.
	// When it reaches the end, it returns to the beginning of the array.
	// If the array is tampered with it will automatically find the next tweet in order and display it.

	// Verify we have data from Twitter first
	if (twitterResponseData) {

		// Generate a key list for the Twitter respone data
		// This will be a key value pair of key # to twitter tweet ID
		var tweetIDs = Object.keys(twitterResponseData.tweets);

		// Determine if we have a tweet currently loaded up
		if (activeTweet.value.id_str) {
			// Determine the current position in the array
			var index = tweetIDs.indexOf(activeTweet.value.id_str)
			// Select the next valid position in the array
			index = (index + 1) % (tweetIDs.length)
		} else {
			// We don't have a tweet up; use the first item in the array
			index = 0
		}

		// Using the index calculated above, determine the twitter ID using the key value pair.
		// Then submit the object to the format_tweet function before sending to the replicant to display on the graphic pages.
		nodecg.log.info('[twitter] Loading next tweet ' + tweetIDs[index]);
		activeTweet.value = format_tweet(twitterResponseData.tweets[tweetIDs[index]]);
	} else {
		nodecg.log.info('[twitter] Unable to load new tweets as Twitter data is empty.  Will try again in ' + tweet_display_time + ' ms');
	}
	setTimeout(cycleTweet, tweet_display_time);
}

// Start the loops
updateTweetCollection();
cycleTweet();
