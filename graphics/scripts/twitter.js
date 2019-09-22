// Pull in the current_tweet replicant.  Whenever it changes run the appropriate
// functions to set it up and display.
const activeTweet = nodecg.Replicant('activeTweet');

activeTweet.on('change', tweet => {
    console.log('[twitter]: Processing new tweet from backend.');
    set_tweet(tweet);
});

/**
 * Hides the tweet content from the screen.
 */
function hideTweet() {
    document.getElementById('block-twitter-tweet-wrapper').style.opacity = '0';
    return;
}

/**
 * Shows the tweet content on the screen.
 */
function showTweet() {
    document.getElementById('block-twitter-tweet-wrapper').style.opacity = '1';
    return;
}

/**
 * Set tweet on page. 
 * Sets the tweet HTML elements to the appropriate values
 * according to the current tweet data.
 */
function set_tweet(tweet) {
    hideTweet();
    setTimeout(function () {
        document.getElementById('tweet-username').innerText = tweet.name;
        document.getElementById('tweet-screenname').innerText = tweet.screen_name;
        document.getElementById('tweet-time').innerText = tweet.created_at;
        document.getElementById('tweet-text').innerHTML = tweet.formatted_text;
        document.getElementById('tweet-avatar').src = tweet.avatar;

        if (tweet.image) {
            // Commented out til we figure out what to do with media.
            //document.getElementById('tweet-media').src = tweet.image.media_url;
        }
        else {
            document.getElementById('tweet-media').src = "";
        }
        textFit(document.getElementsByClassName('block-twitter-tweet-text'), { minFontSize: 10, maxFontSize: 38, multiLine: true });
        textFit(document.getElementsByClassName('block-twitter-tweet-metadata'), { maxFontSize: 18 })
    },1000);
    setTimeout(showTweet, 1000);
}

