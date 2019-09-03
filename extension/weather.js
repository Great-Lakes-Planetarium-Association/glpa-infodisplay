module.exports = function (nodecg)
{
	// Get some bundle config values
	const darkskyAPI = nodecg.bundleConfig.weather.APIURL + nodecg.bundleConfig.weather.APIKey + '/' + nodecg.bundleConfig.weather.location + '/?exclude=flags,alerts,hourly,minutely';

	// Obtain the weather replicant
	var weather = nodecg.Replicant('weather');

	var conference = nodecg.Replicant("conference");
	var timezone = conference.value.timezone;

	// Load the request module
	var request = require('request');

	// Determine our poll interval (convert minutes to milliseconds)
	if (nodecg.bundleConfig.weather.poll_interval < 5)
	{
		poll_interval = 300000;
	}
	else
	{
		poll_interval = nodecg.bundleConfig.weather.poll_interval * 60000
	}
	nodecg.log.info(`[weather] Will update weather data every ${poll_interval} milliseconds`);

	// Listen for a manual update request for weather data.
	nodecg.listenFor('update_weather', () =>
	{
		nodecg.log.info('[weather] Manual weather update request triggered.');
		update_weather();
	});

	/**
	 * Updates weather data and pushes to replicant.
	 * Obtains the latest weather data for the conference location, performs formatting tasks and then pushes data to replicant.
	 */
	function update_weather() {
		// Make a request to grab the current weather data
		request(darkskyAPI, function (error, response, body)
		{
			// If response is okay load data into the replicant
			if (!error && response.statusCode === 200)
			{
				let weather_data = JSON.parse(body);

				try
				{
					nodecg.log.info('[weather] New weather data received.');

					let formatted_weather_data =
					{
						current: 
						{
							temperature: Math.round(weather_data.currently.temperature),
							icon: weather_data.currently.icon,
							summary: weather_data.currently.summary
						},
						today:
						{
							
							day_name: new Date(weather_data.daily.data[0].time * 1000).toLocaleString("en-US", { "weekday": "long", "timeZone": timezone }),
							temp_low: Math.round(weather_data.daily.data[0].temperatureLow),
							temp_high: Math.round(weather_data.daily.data[0].temperatureHigh),
							icon: weather_data.daily.data[0].icon,
							summary: weather_data.daily.data[0].summary
						},
						tomorrow: 
						{
							day_name: new Date(weather_data.daily.data[1].time * 1000).toLocaleString("en-US", { "weekday": "long", "timeZone": timezone}),
							temp_low: Math.round(weather_data.daily.data[1].temperatureLow),
							temp_high: Math.round(weather_data.daily.data[1].temperatureHigh),
							icon: weather_data.daily.data[1].icon,
							summary: weather_data.daily.data[1].summary
						},
					}

					// Send updated weather data to replicant
					weather.value = formatted_weather_data;
				} 
				catch (e)
				{
					nodecg.log.error("[weather] Unable to load weather: ", e.stack);
				}
			}
		});
	}

	
	/**
	 * Loop function to update weather data.
	 * Looping function that kicks off the main function on a fixed interval.
	 */
	function loop_update_weather()
	{
		nodecg.log.info('[weather] Beginning weather update loop.');
		update_weather();
		nodecg.log.info('[weather] Sleeping for ' + poll_interval + 'ms.  Nap time!');
		setTimeout(loop_update_weather,poll_interval);
	}

	// Start the loop
	loop_update_weather();
}