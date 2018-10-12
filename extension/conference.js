module.exports = function (nodecg) {
	// Obtain the conference replicant
	const conference = nodecg.Replicant('conference');
	// Load the request module
	var request = require('request');

	nodecg.log.info(`[conference] Will update conference data every ${nodecg.bundleConfig.conference.pollInterval} seconds.`);

	// Function obtains the conference data and populates it into a replicant for display on the graphics pages
	function updateConference() {
		// Make a request to grab the current conference data
		request(nodecg.bundleConfig.conference.jsonUrl, function (error, response, body) {
			// If response is okay load data into the replicant
			if (!error && response.statusCode === 200) {
				try {
					conference.value = JSON.parse(body);
					nodecg.log.info('[conference] Conference data updated successfully.');
				} catch (e) {
					nodecg.log.info('[conference] Conference data failed to update.');
					nodecg.log.error("[conference] Unable to load conference data: ", e.stack);
				}
			}
		});
		// Request new data periodically

		setTimeout(updateConference,nodecg.bundleConfig.conference.pollInterval * 1000);
	}

	// Start the loop
	updateConference();

}
