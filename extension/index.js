'use strict';

module.exports = function (nodecg) {
    require('./weather')(nodecg);
    require('./conference')(nodecg);
};
