modules.exports = function(NodeCG) {

	// This extension handles pulling in Tweets for display on the info page
	'use strict';

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
	var tweets = nodecg.Replicant('tweets', {defaultValue: []});

	// getTweetCollection
	// Returns a JSON object containing tweet entries in the Twitter collection
	function getTweetCollection(ColID)
	{
		var params = {id: "custom-" + ColID};
		client.get('collections/entries', params, function(error, tweets, response) {
		if (!error) {
				nodecg.log.info('[twitter]: Obtained updated JSON of collection from Twitter"');
				console.log(tweets);
				return tweets;
		}
		});
	}

	// updateTwitterReplicant
	// This function will obtain a list of tweets from Twitter, format them, and then replace the contents of the replicant.
	function updateTwitterReplicant()
	{
		tweets = getTweetCollection(nodecg.bundleConfig.twitter.collectionID);
		/* Need a foreach loop here */

	}

	updateTwitterReplicant();

	/* Listen for a request to update Twitter */



	/**
	 * Adds a Tweet to the queue.
	 * @param {Object} tweet - The tweet to add.
	 * @returns {undefined}
	 */
	function addTweet(tweet) {

		// Don't add the tweet if we already have it
		const isDupe = tweets.value.find(t => t.id_str === tweet.id_str);
		if (isDupe) {
			return;
		}

		// Parse emoji.
		tweet.text = twemoji.parse(tweet.text);

		// Replace newlines with spaces
		tweet.text = tweet.text.replace(/\n/ig, ' ');

		// Look for the conference hashtag in the text and replace it with a CSS class so we can style it
		tweet.text = tweet.text.replace(RegExp(confHashTag,"g"), '<span class="hashtag">'+confHashtag+'</span>');

		// Add the tweet to the list
		tweets.value.push(tweet);
	}

	/**
	 * Removes a Tweet (by id) from the queue.
	 * @param {String} idToRemove - The ID string of the Tweet to remove.
	 * @returns {Object} - The removed tweet. "Undefined" if tweet not found.
	 */
	function removeTweetById(idToRemove) {
		if (typeof idToRemove !== 'string') {
			throw new Error(`[twitter] Must provide a string ID when removing a tweet. ID provided was: ${idToRemove}`);
		}

		let didRemoveTweet = false;
		tweets.value.some((tweet, index) => {
			if (tweet.id_str === idToRemove || tweet.gdqRetweetId === idToRemove) {
				tweets.value.splice(index, 1);
				didRemoveTweet = true;
				return true;
			}

			return false;
		});
		return didRemoveTweet;
	}
}