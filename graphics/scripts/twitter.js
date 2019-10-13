// Pull in the current_tweet replicant.  Whenever it changes run the appropriate
// functions to set it up and display.
const activeTweet = nodecg.Replicant('activeTweet');

activeTweet.on('change', tweet => {
    nodecg.log.info('Processing new tweet from backend.');
    set_tweet(tweet);
});

/**
 * Hides the tweet content from the screen.
 */
function hideTweet() {
    document.getElementById('block-twitter').style.opacity = '0';
    return;
}

/**
 * Shows the tweet content on the screen.
 */
function showTweet() {
    document.getElementById('block-twitter').style.opacity = '1';
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
        document.getElementById('block-twitter').className = tweet.layout;
        document.getElementById('tweet-username').innerText = tweet.name;
        document.getElementById('tweet-screenname').innerText = tweet.screen_name;
        document.getElementById('tweet-time').innerText = tweet.created_at;
        document.getElementById('tweet-text').innerHTML = tweet.formatted_text;
        document.getElementById('tweet-author-avatar').src = tweet.avatar;

        if (tweet.image) {
            document.getElementById('tweet-image-1').src = tweet.image.media_url;
        }
        else {
            document.getElementById('tweet-image-1').src = "";
        }
        textFit(document.getElementsByClassName('textFit tweet'), { minFontSize: 10, maxFontSize: 48, multiLine: true });
        textFit(document.getElementsByClassName('block-twitter-tweet-metadata'), { maxFontSize: 18 })
    },1000);
    setTimeout(showTweet, 1000);
}

