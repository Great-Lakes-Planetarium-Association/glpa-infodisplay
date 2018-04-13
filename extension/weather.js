// Load the NodeCG API
const nodecg = require('./util/nodecg-api-context').get();

// Load the Darksky API
// The API key should move to "<nodecg install dir>/cfg/glpa-infodisplay.json" someday
const darkskyAPI = 'https://api.darksky.net/forecast/' +
	nodecg.bundleConfig.weather.APIKey + '/' +
	nodecg.bundleConfig.weather.latitude + ',' + nodecg.bundleConfig.weather.longitude;

// Specify how often to obtain weather data
let pollInterval = nodecg.bundleConfig.weather.interval;

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
		if (!error && response.statusCode === 200) {
			try {
				weather.value = JSON.parse(body);
			} catch (e) {
				nodecg.log.error("Unable to load weather: ", e.stack);
			}
		}
	});
	// Request new data periodically
	console.log(`weather: Will update weather data every ${pollInterval} minutes (${pollInterval * 60 *1000} milliseconds)`);
	setTimeout(updateWeather,pollInterval * 60 * 1000);
}

// Start the loop
updateWeather();