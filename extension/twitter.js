
module.exports = function (nodecg)
{
	// Load twemoji module to convert emoji strings to images
	const twemoji = require('twemoji');

	// Load variables from bundle
	const confHashtag = nodecg.bundleConfig.twitter.confHashtag;
	const tweet_display_time = nodecg.bundleConfig.twitter.tweet_display_time * 1000;
	const timezone = nodecg.bundleConfig.conference.timezone;

	// Configure a Twitter object
	var Twitter = require('twitter');
	var client = new Twitter
	({
		consumer_key: nodecg.bundleConfig.twitter.APIKey,
		consumer_secret: nodecg.bundleConfig.twitter.APISecret,
		access_token_key: nodecg.bundleConfig.twitter.AccessToken,
		access_token_secret: nodecg.bundleConfig.twitter.AccessSecret
	});

	// Replicant to store the last known good copy of Twitter collection data
	var twitter_collection_data = nodecg.Replicant('twitter_collection_data')

	// Replicant to store current tweet in
	var current_tweet = nodecg.Replicant('current_tweet');

	/**
	 * Get a tweets within a collection.
	 * Downloads a JSON document with information about tweets which have been curated within a Twitter collection timeline.
	 * @param {!number} collection_id=nodecg.bundleConfig.twitter.collection_id
	 */
	function update_collection_tweets(collection_id = nodecg.bundleConfig.twitter.collection_id)
	{
		var params = 
		{
			id: "custom-" + collection_id,
			tweet_mode: 'extended'
		};

		client.get('collections/entries', params, function(error, collection_data, response) {
			if (!error) 
			{
				twitter_collection_data = collection_data;
			}
		});

		setTimeout(update_collection_tweets,nodecg.bundleConfig.twitter.poll_interval * 60 * 1000);
	}

	/**
	 * Cycles through array of tweets and sends it out for display.
	 * Function cycles through all tweets obtained from the collection result.
	 */
	function tweet_cycle()
	{
		// Create a shadow copy of the collection data objects
		let twitter_collection_data = twitter_collection_data.splice();

		// TODO: Add logic to determine if we have objects to iterate over
		for (tweet in twitter_collection_data.objects.tweets)
		{
			let user = twitter_collection_data.objects.users[tweet.user.id_str];
			let tweet_data = 
			{
				full_text = tweet.full_text,
				created_at = new Date(Date.parse(tweet.created_at.replace(/( \+)/, ' UTC$1'))).toLocaleString("en-us", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', "timeZone": timezone}),
				name = user.name,
				screen_name = "@" + user.screen_name,
				avatar = user.profile_image_url,
				image = 
				{
					media_url = tweet.entities.media[0].media_url,
					sizes = tweet.entities.media[0].sizes
				}
			}

			// Replace emoji codes in full_text with emoji images
			tweet_data.full_text = twemoji.parse(tweet_data.full_text);

			// Replace newlines with a space
			tweet_data.full_text = tweet_data.full_text.replace(/\n/ig, ' ');

			// Add HTML span tag around text matching the conference hashtag
			tweet_data.full_text = tweet_data.full_text.replace(RegExp(confHashtag,"ig"), '<span class="hashtag">'+confHashtag+'</span>');

			// Remove the link to the tweet
			tweet_data.full_text = tweet_data.full_text.replace(/https:\/\/t.co\/\S+/,'');

			// Send data to the replicant
			nodecg.log.info('[twitter]: Sending tweet ' + tweet.id + ' to display');
			current_tweet = tweet_data;
		}

		setTimeout(tweet_cycle,tweet_display_time);
	}

	// Start the loops
	update_collection_tweets();
	tweet_cycle();
}