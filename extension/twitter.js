module.exports = function (nodecg)
{
	// Load twemoji module to convert emoji strings to images
	const twemoji = require('twemoji');

	// Load variables from bundle
	const confHashtag = nodecg.bundleConfig.twitter.confHashtag;

	// Configure a Twitter object
	var Twitter = require('twitter');
	var client = new Twitter({
		consumer_key: nodecg.bundleConfig.twitter.APIKey,
		consumer_secret: nodecg.bundleConfig.twitter.APISecret,
		access_token_key: nodecg.bundleConfig.twitter.AccessToken,
		access_token_secret: nodecg.bundleConfig.twitter.AccessSecret
	});

	// Set up a replicant to track tweets in
	var tweetsReplicant = nodecg.Replicant('tweets');

	// updateTwitter
	// Get the twitter feed and stuff into the replicant
	function updateTwitterFeed()
	{
		// Clear out our local timeline
		let tweetTimeline = [];
		// Create a list of paramaters for the query
		var params = {
			id: "custom-" + nodecg.bundleConfig.twitter.collectionID,
			tweet_mode: 'extended'
		};
		// Request data from Twitter
		client.get('collections/entries', params, function(error, twitterData, response) {
			if (!error) {
				nodecg.log.info('[twitter]: Obtained updated JSON of collection from Twitter"');
				Object.entries(twitterData.objects.tweets).forEach(([key, val]) => {
					val.full_text = twemoji.parse(val.full_text);
					val.full_text = val.full_text.replace(/\n/ig, ' ');
					val.full_text = val.full_text.replace(RegExp(confHashtag,"ig"), '<span class="hashtag">'+confHashtag+'</span>');
			});
			
			// Send fixed up Twitter data to replicant
			tweetsReplicant.value = twitterData;
			nodecg.log.info('[twitter]: Posted JSON data into replicant');
		}
		});
	}

	// Loop to query Twitter
	// This is separate from the main function incase we get an out-of-band request.
	function twitterUpdateLoop()
	{
		updateTwitterFeed();
		setTimeout(twitterUpdateLoop,nodecg.bundleConfig.twitter.pollInterval * 60 * 1000);
	}

	/* Listen for a request to update Twitter */
	nodecg.listenFor('UpdateTwitter', () =>
	{
		nodecg.log.info('[twitter]: received an Update Twitter message... so time to update!');
		updateTwitterFeed();
	});

	// Start the Twitter loop
	twitterUpdateLoop();
}