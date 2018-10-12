// Script handles updating the appropriate twitter divs and shows tweets in the queue

var tweetReplicant = nodecg.Replicant('tweets');
// Tweet ID list is the list tweet IDs (object keys) we currently know of
var tweetOrder = [];
var currentTimelineID;
var tweetTimer = nodecg.bundleConfig.twitter.displayTime;

// Wait for tweet object to load
NodeCG.waitForReplicants(tweetReplicant).then(() =>
{
    // Build our tweet order
    tweetOrder = [];
    Object.entries(tweetReplicant.value.response.timeline).forEach(([key,val]) =>
    {
        tweetOrder.push(val.tweet.id);
    });
    
    tweetLoop();
});

tweetReplicant.on('change', newval =>
{
    // When we get a replicant update, need to determine the nextTweetID incase of a change.
    console.log('twitter: received an update to the tweet replicant');
})

function showTweet()
{
    let nextTimelineID = 0
    // If we're at the end of the timeline, go to first element
    if ((currentTimelineID+1) >= tweetOrder.length) {
        nextTimelineID = 0;
    }
    else
    {
        nextTimelineID = currentTimelineID + 1;
    }
    // Using the index position, look in the tweet time line for the tweet id.
    // Pass the tweet ID from the timeline into the tweets list to get the tweet
    let tweet = tweetReplicant.value.objects.tweets["1050099542941667328"];
    let user = tweetReplicant.value.objects.users[tweet.user.id];
    let tweetTime = new Date(Date.parse(tweet.created_at.replace(/( \+)/, ' UTC$1'))); 


    document.getElementById('screenname').innerHTML = "@" + user.screen_name + ' &mdash; ';
    // Need to add a timezone parameter -- look at weather.
    document.getElementById('tweettime').innerText = tweetTime.toLocaleDateString("en-us", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit'});
    document.getElementById('tweet-text').innerHTML = tweet.full_text.replace(/https:\/\/t.co\/\S+/,'');
    document.getElementById('avatar').src = user.profile_image_url.replace('_normal',"_bigger");
    textFit(document.getElementsByClassName('tweet-text'), {minFontSize: 10, maxFontSize: 38, multiLine: true});
    textFit(document.getElementsByClassName('tweet-metadata'), {maxFontSize: 18});
    if (tweet.entities.media) {
        document.getElementsByClassName('twitter-content')[0].style.background = 'url(' + tweet.entities.media[0].media_url + ') no-repeat top left';
        document.getElementsByClassName('twitter-content')[0].style.backgroundSize = 'auto 100%';
        document.getElementsByClassName('twitter-content')[0].style.backgroundPosition = 'center';
    } else {
        document.getElementsByClassName('twitter-content')[0].style.background = "";
    }

    // Set the nextTimeLineID to the currentTimelineID
    currentTimelineID = nextTimelineID;
}

function tweetLoop()
{
    showTweet();
    setTimeout(tweetLoop,tweetTimer * 1000);
}

/*
function tweetLoop() {
    clearInterval(tweetTimer);
    newvaluesength = tweets.value.length;
    showTweet(tweetIndex);
    textFit(document.getElementsByClassName('tweet-text'), {minFontSize: 10, maxFontSize: 38, multiLine: true});
    textFit(document.getElementsByClassName('tweet-metadata'), {maxFontSize: 18});
    tweetTimer = setInterval(function() {
        showTweet(tweetIndex);

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