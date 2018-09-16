// Register the NodeCG weather replicant
weather = nodecg.Replicant('weather');

// Create a new Skycons object
var skycons = new Skycons({ "color": "white" });
skycons.play();

// Watch for a change to the weather replicant
weather.on('change', newval => {
    let current = newval.currently;
    let today = newval.daily.data[0];
    let tomorrow = newval.daily.data[1];
    let further = newval.daily.data[2];

    // Calculate the current weather timestamp
    let current_time = new Date(current.time * 1000);

    // So Steve doesn't go crazy let's print some stuff to the console
    console.log(`weather: update received from extension - ${current_time.toLocaleTimeString("en-us", timeformat)}`);

    // Set the current temperature
    document.getElementById('current-temp').innerHTML = Math.round(current.temperature) + String.fromCharCode(176) + "F";

    // Update the current weather conditions
    document.getElementById('weather-today-temps').innerHTML =
        "H: " + Math.round(today.temperatureMax) + " " + String.fromCharCode(176) + "F, L: " + Math.round(today.temperatureMin) + " " + String.fromCharCode(176) + "F";
    // Set the icon for today
    skycons.set("weather-today-icon", today.icon);

    // Update tomorrow's weather conditions
    let tomorrowTime = new Date(tomorrow.time * 1000);
    document.getElementById('weather-tomorrow-temps').innerHTML =
        "<br />H: " + Math.round(tomorrow.temperatureMax) + String.fromCharCode(176) + ", L: " + Math.round(tomorrow.temperatureMin) + String.fromCharCode(176);
    // Set the icon for tomorrow
    skycons.set("weather-tomorrow-icon", tomorrow.icon);

    // Update further date
    let furtherTime = new Date(further.time * 1000);
    document.getElementById('weather-further-temps').innerHTML =
        "H: " + Math.round(twoDaysAway.temperatureMax) + String.fromCharCode(176) + ", L: " + Math.round(twoDaysAway.temperatureMin) + String.fromCharCode(176);
    // Set the icon for tomorrow
    skycons.set("weather-further-icon", further.icon);
});