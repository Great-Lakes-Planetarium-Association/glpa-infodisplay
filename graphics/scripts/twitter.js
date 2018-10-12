// Script handles updating the appropriate twitter divs and shows tweets in the queue

var tweetReplicant = nodecg.Replicant('tweets');
// Tweet ID list is the list tweet IDs (object keys) we currently know of
var tweetIDList = [];
var currentTweetID = null;
var nextTweetID = null;
var tweetTimer = nodecg.bundleConfig.twitter.displayTime;

// Wait for tweet object to load
NodeCG.waitForReplicants(tweets).then(() =>
{
    // G
    /*
    let totalKeys = Object.keys(tweets.value).length;

    if (totalKeys == 0) 
    {
        console.log('twitter: Replicant loaded; no tweets to display.');
    }
    else
    {
        console.log('twitter: Replicant loaded; tweets to display.');
        currentTweetID = Object.keys(tweets.value)[0];
        showTweet()
    }*/
});

var tweetTimer;
var tweetIndex = 0;

tweets.on('change', newval =>
{
    // When we get a replicant update, need to determine the nextTweetID incase of a change.
    console.log('twitter: received an update to the tweet replicant');
    
    // Get the current timeline order
    var tweetTimeline = Objects.keys(tweetReplicant.values.response);
    
})

/*function showTweet()
{
    let tweet = tweets.value[Object.key]
}*/

/*
function tweetLoop() {
    clearInterval(tweetTimer);
    newvaluesength = tweets.value.length;
    showTweet(tweetIndex);
    textFit(document.getElementsByClassName('tweet-text'), {minFontSize: 10, maxFontSize: 38, multiLine: true});
    textFit(document.getElementsByClassName('tweet-metadata'), {maxFontSize: 18});
    tweetTimer = setInterval(function() {
        showTweet(tweetIndex);
        textFit(document.getElementsByClassName('tweet-text'), {minFontSize: 10, maxFontSize: 38, multiLine: true});
        textFit(document.getElementsByClassName('tweet-metadata'), {maxFontSize: 18});
        tweetIndex = (tweetIndex+1) % arrayLength;
    }, 10000);
}

function showTweet(index) {
  newvaluesal = tweets.value[index];
    var tweetTime = new Date(Date.parse(newVal.created_at.replace(/( \+)/, ' UTC$1')));  
    document.getElementById('screenname').innerHTML = "@" + newVal.user.screen_name + ' &mdash; ';
    document.getElementById('tweettime').innerText = tweetTime.toLocaleDateString("en-us", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit'});
    document.getElementById('tweet').innerHTML = newVal.text.replace(/https:\/\/t.co\/\S+/,'');
    document.getElementById('avatar').src = newVal.user.profile_image_url.replace('_normal',"_bigger");
    if (newVal.entities.media) {
        document.getElementsByClassName('twitter-content')[0].style.background = 'url(' + newVal.entities.media[0].media_url + ') no-repeat top left';
        document.getElementsByClassName('twitter-content')[0].style.backgroundSize = 'auto 100%';
        document.getElementsByClassName('twitter-content')[0].style.backgroundPosition = 'center';
    } else {
        document.getElementsByClassName('twitter-content')[0].style.background = "";
    }
    

}*/