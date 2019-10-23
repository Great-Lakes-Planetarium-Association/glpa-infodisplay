"use strict";

// Obtain the weather replicant
var weather = nodecg.Replicant('weather');

weather.on("change", weather_data => {
    document.getElementById('weather-update-time').innerText = weather_data.current.time;
});