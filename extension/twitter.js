module.exports = function (nodecg)
{
	// Load twemoji module to convert emoji strings to images
	const twemoji = require('twemoji');

	// Configure a Twitter object
	var Twitter = require('twitter');
	var client = new Twitter({
		consumer_key: nodecg.bundleConfig.twitter.APIKey,
		consumer_secret: nodecg.bundleConfig.twitter.APISecret,
		access_token_key: nodecg.bundleConfig.twitter.AccessToken,
		access_token_secret: nodecg.bundleConfig.twitter.AccessSecret
	});

	// Set up a replicant to track tweets in
	var tweetsReplicant = nodecg.Replicant('acceptedTweets', {defaultValue: []});

	// updateTwitter
	// Get the twitter feed and stuff into the replicant
	function updateTwitterFeed()
	{
		var params = {id: "custom-" + nodecg.bundleConfig.twitter.collectionID};
		client.get('collections/entries', params, function(error, tweets, response) {
		if (!error) {
				nodecg.log.info('[twitter]: Obtained updated JSON of collection from Twitter"');
				for (tweet of Iterate(tweets.objects.tweets) )
				{
					tweet.full_text = twemoji.parse(tweet.full_text);
					tweet.full_text = tweet.full_text.replace(/\n/ig, ' ');
					tweet.full_text = tweet.full_text.replace(RegExp(confHashTag,"g"), '<span class="hashtag">'+confHashtag+'</span>');
				}
				tweetsReplicant.value = tweets.objects.tweets;
				nodecg.log.info('[twitter]: Posted JSON data into replicant');
		}
		});
	}

	/* Listen for a request to update Twitter */
	nodecg.listenFor('UpdateTwitter', () => 
	{
		nodecg.log.info('[twitter]: received an Update Twitter message... so time to update!');
		updateTwitterFeed();
	});


	updateTwitterFeed;
}