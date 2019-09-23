'use strict';


// Script handles processing updates and visibility for the ticker bar

const self = this;

nodecg.listenFor('tickerVisible', (value) => {
    if (value) {
        nodecg.log.info('Request to show ticker received');
        document.getElementById('block-ticker').style.opacity = '1';
    } else {
        nodecg.log.info('Request to hide ticker received');
        document.getElementById('block-ticker').style.opacity = '0';
    }
});