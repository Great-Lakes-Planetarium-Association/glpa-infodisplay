// Pull in the current_tweet replicant.  Whenever it changes run the appropriate
// functions to set it up and display.
const activeTweet = nodecg.Replicant('activeTweet');
console.log("hello");

activeTweet.on('change', tweet => {
    console.log('[twitter]: Processing new tweet from backend.');
    // Fade out the tweet container, wait 1 second for fade, then set tweet
    tweet_visibility(false);
    setTimeout(set_tweet(tweet), 1000);

    // Wait one second for tweet data to load, then fade up container.
    setTimeout(tweet_visibility(true), 1000);
});

/**
 * Set tweet on page. 
 * Sets the tweet HTML elements to the appropriate values
 * according to the current tweet data.
 */
function set_tweet(tweet)
{
    document.getElementById('screenname').innerHTML = tweet.screen_name + ' &mdash; ';
    document.getElementById('tweettime').innerText = tweet.created_at;
    document.getElementById('tweet-text').innerHTML = tweet.formatted_text;
    document.getElementById('avatar').src = tweet.avatar;

    if (tweet.image)
    {
        document.getElementById('tweet-media').src = tweet.image.media_url;
    }
    else
    {
        document.getElementById('tweet-media').src = "";
    }
    textFit(document.getElementsByClassName('tweet-text'), {minFontSize: 10, maxFontSize: 38, multiLine: true});
    textFit(document.getElementsByClassName('tweet-metadata'), {maxFontSize: 18});
}

/**
 * Control visibility of tweet content.
 * Controls the visibility of the tweet content container.
 *
 * @param {boolean} visible
 */
function tweet_visibility(visible)
{
    if (visible)
    {
        document.getElementById('tweet-container').style.opacity = '1';
    }
    else
    {
        document.getElementById('tweet-container').style.opacity = '0';
    }
}