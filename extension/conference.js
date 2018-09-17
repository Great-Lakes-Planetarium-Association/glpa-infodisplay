module.exports = function (nodecg) {
	// Obtain the conference replicant
	const conference = nodecg.Replicant('conference');
	// Load the request module
	var request = require('request');

	// Function obtains the conference data and populates it into a replicant for display on the graphics pages
	function updateConference() {
		// Make a request to grab the current conference data
		request(nodecg.bundleConfig.conference.jsonUrl, function (error, response, body) {
			// If response is okay load data into the replicant
			if (!error && response.statusCode === 200) {
				try {
					conference.value = JSON.parse(body);
				} catch (e) {
					nodecg.log.error("Unable to load conference data: ", e.stack);
				}
			}
		});
		// Request new data periodically
		console.log(`conference: Will update conference data every ${nodecg.bundleConfig.conference.pollInterval} seconds.`);
		setTimeout(updateConference,nodecg.bundleConfig.conference.pollInterval * 1000);
	}

	// Start the loop
	updateConference();

}
