module.exports = function (nodecg)
{
	// Load the Darksky API
	var darkskyAPI = nodecg.bundleConfig.weather.APIURL + nodecg.bundleConfig.weather.APIKey + '/' + nodecg.bundleConfig.weather.location + '/?exclude=flags,alerts,hourly,minutely';

	// Specify how often to obtain weather data
	var weatherPoll = nodecg.bundleConfig.weather.interval;

	// Check we're not refreshing faster than every 5 minutes; free API won't allow it.
	if (weatherPoll < 5) {
		weatherPoll = 5;
	}

	nodecg.log.info(`[weather] Will update weather data every ${weatherPoll} minutes (${weatherPoll * 60 * 1000} milliseconds)`);
	console.log(`[weather] Will update weather data every ${weatherPoll} minutes (${weatherPoll * 60 * 1000} milliseconds)`);

	// Obtain the weather replicant
	var weather = nodecg.Replicant('weather');

	// Load the request module
	var request = require('request');

	// function updateWeather
	// Function obtains the weather data from DarkSky and populates it into a replicant for display on the graphics pages
	function updateWeather() {
		// Make a request to grab the current weather data
		request(darkskyAPI, function (error, response, body) {
			// If response is okay load data into the replicant
			if (!error && response.statusCode === 200)
			{
				try {
					weather.value = JSON.parse(body);
					nodecg.log.info('[weather] New weather data received.');
				} catch (e) {
					nodecg.log.error("[weather] Unable to load weather: ", e.stack);
				}
			}
		});
	}

	nodecg.listenFor('UpdateWeather', () =>
	{
		nodecg.log.info('[weather] Manual weather update request triggered.');
		updateWeather();
	});

	// Create a loop to check weather periodically
	function weatherUpdateLoop() {
		nodecg.log.info('[weather] Beginning weather update loop.');
		updateWeather();
		setTimeout(weatherUpdateLoop,weatherPoll * 10000);

	}

	// Start the loop
	weatherUpdateLoop();
}