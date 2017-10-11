'use strict';

// Load NodeCG api
const nodecgApiContext = require('./util/nodecg-api-context');

module.exports = function (nodecg) {
<<<<<<< HEAD

    nodecgApiContext.set(nodecg);
    require('./weather');
    require('./twitter');
=======
    require('./weather')(nodecg);
    require('./conference')(nodecg);
>>>>>>> origin/master
};
