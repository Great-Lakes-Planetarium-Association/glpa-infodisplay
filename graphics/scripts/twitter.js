// Script handles updating the appropriate twitter divs and shows tweets in the queue

var acceptedTweets = nodecg.Replicant('acceptedTweets');
var tweetTimer;
var tweetIndex = 0;
// Only start looping when we're loaded -- if we reload, then start the loop again.
acceptedTweets.on('change', function() {
    if(acceptedTweets.value.length > 0) {
        tweetLoop();
    }
})

function tweetLoop() {
    clearInterval(tweetTimer);
    var arrayLength = acceptedTweets.value.length;
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
    var newVal = acceptedTweets.value[index];
    var tweetTime = new Date(Date.parse(newVal.created_at.replace(/( \+)/, ' UTC$1')));  
    document.getElementById('screenname').innerHTML = "@" + newVal.user.screen_name + ' &mdash; ';
    document.getElementById('tweettime').innerText = tweetTime.toLocaleDateString("en-us", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit'});
    document.getElementById('tweet').innerHTML = newVal.text.replace(/https:\/\/t.co\/\S+/,'');
    document.getElementById('avatar').src = newVal.user.profile_image_url.replace('_normal',"_bigger");
    if (newVal.entities.media) {
        document.getElementsByClassName('twitter-content')[0].style.background = 'url(' + newVal.entities.media[0].media_url + ') no-repeat top left';
        document.getElementsByClassName('twitter-content')[0].style.backgroundSize = 'auto 100%';
    } else {
        document.getElementsByClassName('twitter-content')[0].style.background = "";
    }
    

}