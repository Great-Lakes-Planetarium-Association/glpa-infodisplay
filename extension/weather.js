module.exports = function (nodecg)
{
	// Load the Darksky API
	const darkskyAPI = nodecg.bundleConfig.weather.APIURL + nodecg.bundleConfig.weather.APIKey + '/' + nodecg.bundleConfig.weather.location + '/?exclude=flags,alerts,hourly,minutely';

	// Specify how often to obtain weather data
	let pollInterval = nodecg.bundleConfig.weather.interval;

	// Check we're not refreshing faster than every 5 minutes; free API won't allow it.
	if (pollInterval < 5) {
		pollInterval = 5;
	}

	nodecg.log.info(`weather: Will update weather data every ${pollInterval} minutes (${pollInterval * 60 * 1000} milliseconds)`);

	// Obtain the weather replicant
	const weather = nodecg.Replicant('weather');

	// Load the request module
	var request = require('request');

	// function updateWeather
	// Function obtains the weather data from DarkSky and populates it into a replicant for display on the graphics pages
	function updateWeather() {
		// Make a request to grab the current weather data
		request(darkskyAPI, function (error, response, body) {
			// If response is okay load data into the replicant
			if (!error) {
				try {
					weather.value = JSON.parse(body);
					nodecg.log.info('weather: New weather data received.');
				} catch (e) {
					nodecg.log.error("Unable to load weather: ", e.stack);
				}
			}
		});
		// Request new data periodically

		setTimeout(updateWeather,pollInterval * 60 * 1000);
	}

	// Start the loop
	updateWeather();
}