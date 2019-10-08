'use strict';

// Load NodeCG api
const nodecgApiContext = require('./util/nodecg-api-context');

module.exports = function (nodecg) {

    // Set the API context to the nodecg variable
    nodecgApiContext.set(nodecg);

    // Report startup information
    nodecg.log.info("Bundle version: " + nodecg.bundleVersion);
    nodecg.log.info("Bundle branch: " + nodecg.bundleGit.branch);
    nodecg.log.info("Bundle hash hash: " + nodecg.bundleGit.hash);

    // Load modules
    require('./weather');
    require('./twitter');
    require('./conference');
};