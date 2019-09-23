'use strict'; 

/* This module is responsible for generating and sending data for the ticker
bar on the front end. */

// Load the NodeCG context
const nodecg = require('./util/nodecg-api-context').get();

/* Obtain the NodeCG tickerData replicant */
var tickerData = nodecg.Replicant('tickerData');
var weather = nodecg.Replicant('weather');

/**
 * updateReplicant sends processed ticker data from the backend to the front end
 *
 * @param {*} dataType
 * @param {*} data
 */
function updateReplicant(dataType, data) {

    nodecg.log.info('Sending tickerData update');
    tickerVisibility(false);
    tickerData.value =
        {
            infoType: dataType,
            infoData: data
        };
    tickerVisibility(true);
}

/**
 * Controls the visibility of the ticker by sending a message from the backend
 * to the front end.
 *
 * @param {*} value
 */
function tickerVisibility(value) {
    if (value) {
        nodecg.sendMessage('tickerVisible', true);
    } else {
        nodecg.sendMessage('tickerVisible', false);
    }
}

function tickerMaster() {

    updateReplicant('weather',weather.value);
    setTimeout(tickerMaster,5000)
}