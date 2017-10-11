(function () {
	'use strict';
    const conference = nodecg.Replicant('conference');

    Polymer({
        is: 'conference-schedule',

        properties:{
            comingUp: {
                type: String
            }
        },

        ready() {
            // Get the room number
            var stream = new URLSearchParams(window.location.search).get('stream');
        }
    });

})()