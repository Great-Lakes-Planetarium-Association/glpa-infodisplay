'use strict';

// Load NodeCG api
const nodecgApiContext = require('./util/nodecg-api-context');

module.exports = function (nodecg) {

    nodecgApiContext.set(nodecg);
    require('./weather')(nodecg);
    require('./twitter')(nodecg);
    require('./conference')(nodecg);
};
