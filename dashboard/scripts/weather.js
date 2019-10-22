"use strict";

// Obtain the weather replicant
var weather = nodecg.Replicant('weather');

weather.on("change", weather_data => {
    console.log(weather.value.current.time);
});