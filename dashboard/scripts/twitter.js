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