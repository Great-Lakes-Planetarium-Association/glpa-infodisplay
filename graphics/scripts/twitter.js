// Pull in the current_tweet replicant.  Whenever it changes run the appropriate
// functions to set it up and display.
var current_tweet = nodecg.Replicant('current_tweet');
current_tweet.on('Change', tweet =>
    {
        console.log('[twitter]: current_tweet updated; beginning update process.');
        // Fade out the tweet container, wait 1 second for fade, then set tweet
        tweet_visibility(false);
        setTimeout(set_tweet(tweet),1000);

        // Wait one second for tweet data to load, then fade up container.
        setTimeout(tweet_visibility(true), 1000);
        console.log('[twitter]: update to tweet complete.');
    }
)

/**
 * Set tweet on page. 
 * Sets the tweet HTML elements to the appropriate values
 * according to the current tweet data.
 */
function set_tweet(tweet)
{
    console.log('[twitter]: Setting tweet data on page.');
    document.getElementById('screenname').innerHTML = tweet.screen_name + ' &mdash; ';
    document.getElementById('tweettime').innerText = tweet.created_at;
    document.getElementById('tweet-text').innerHTML = tweet.full_text;
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
    console.log('[twitter]: Completed setting tweet data on page.');
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
        console.log('[twitter]: Showing tweet container.');
        document.getElementById('tweet-container').style.opacity = '1';
    }
    else
    {
        console.log('[twitter]: Hiding tweet container.');
        document.getElementById('tweet-container').style.opacity = '0';
    }
}