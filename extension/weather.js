// Load the NodeCG API
// Load NodeCG API
const nodecg = require('./util/nodecg-api-context').get();

// Load the Darksky API
// The API key should move to "<nodecg install dir>/cfg/glpa-infodisplay.json" someday
const darkskyAPI = 'https://api.darksky.net/forecast/9d26d3ddce5a78c393685673a21102b0/38.6273,-90.1979'; // URL to access the DarkSky API

// Specify how often to obtain weather data
// Note that DarkSky has a limit of 1000 requests per day before they bill you.
let pollInterval = "5"; // How often to poll API in minutes

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