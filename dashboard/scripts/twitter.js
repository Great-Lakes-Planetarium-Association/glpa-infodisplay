"use strict";

function updateTwitter() {
	nodecg.sendMessage('updateTwitter', (error, result) => {
        if (error) {
            console.error(error);
            return;
        } else {
            console.log(result);
        }
    })
};

nodecg.listenFor('totalTweets', (value,ack) => {
	document.getElementById('totalTweets').textContent = value;
});
