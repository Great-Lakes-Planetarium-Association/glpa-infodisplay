// Require the weather replicant
const weather = nodecg.Replicant("weather");

// Load up Skycons
const skycons = new Skycons({
    "monochrome": false,
    "colors": {
        "sun": "#eba834"
    }
});
skycons.play();

// Do a weather update when data is available
weather.on("change", weather_data => {
    nodecg.log.info("Processing updated weather.");

    // Handle current weather data stuff //
    // Set current temp
    document.getElementById("weather-current-temp").textContent = weather_data.current.temperature;
    document.getElementById("weather-current-conditions").textContent = weather_data.current.summary;
    skycons.set("weather-current-icon", weather_data.current.icon);

    // Today's forecast
    document.getElementById("weather-today-temp-high").textContent = weather_data.today.temp_high;
    document.getElementById("weather-today-temp-low").textContent = weather_data.today.temp_low;
    document.getElementById("weather-today-conditions").textContent = weather_data.today.summary;
    skycons.set("weather-today-icon", weather_data.today.icon);

    // Update tomorrow's weather conditions
    document.getElementById("weather-tomorrow-title").textContent = weather_data.tomorrow.day_name;
    document.getElementById("weather-tomorrow-temp-high").textContent = weather_data.tomorrow.temp_high;
    document.getElementById("weather-tomorrow-temp-low").textContent = weather_data.tomorrow.temp_low;
    document.getElementById("weather-tomorrow-conditions").textContent = weather_data.tomorrow.summary;
    skycons.set("weather-tomorrow-icon", weather_data.tomorrow.icon);

    nodecg.log.info("Completed processing updated weather.");
});