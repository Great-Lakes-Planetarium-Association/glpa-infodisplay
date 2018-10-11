// Register the NodeCG weather replicant
weather = nodecg.Replicant('weather');
conference = nodecg.Replicant('conference');

// Create a new Skycons object
var skycons = new Skycons({ "color": "black" });
skycons.play();

// Watch for a change to the weather replicant
weather.on('change', newval => {
    let current = newval.currently;
    let today = newval.daily.data[0];
    let tomorrow = newval.daily.data[1];
    let future = newval.daily.data[2];

    // Calculate the current weather timestamp
    let current_time = new Date(current.time * 1000);

    // So Steve doesn't go crazy let's print some stuff to the console
    console.log(`weather: update received from extension - ${new Date()}`);

    // Handle current weather data stuff //
    // Set current temp
    document.getElementById('current-temp').innerText = `${ Math.round(current.temperature) + String.fromCharCode(176) }F`;
    skycons.set('weather-current', current.icon);

    // Today's forecast
    document.getElementById("weather-today-title").innerText = new Date(today.time * 1000).toLocaleString("en-US", { "weekday": "long", "timeZone": conference.timezone });
    document.getElementById('weather-today-temps').innerText = `H: ${Math.round(today.temperatureMax) + String.fromCharCode(176)}F, L: ${Math.round(today.temperatureMin) + String.fromCharCode(176)}F`;
    skycons.set("weather-today-icon", today.icon);

    // Update tomorrow's weather conditions
    document.getElementById("weather-tomorrow-title").innerText = new Date(tomorrow.time * 1000).toLocaleString("en-US", { weekday: "long", timeZone: conference.timezone }    );
    document.getElementById('weather-tomorrow-temps').innerText = `H: ${Math.round(tomorrow.temperatureMax) +String.fromCharCode(176)}F, L: ${Math.round(tomorrow.temperatureMin) + String.fromCharCode(176)}F`;
    skycons.set("weather-tomorrow-icon", tomorrow.icon);

    // Update future date
    document.getElementById("weather-future-title").innerText = new Date(future.time * 1000).toLocaleString("en-US", { "weekday": "long", "timeZone": conference.timezone });
    document.getElementById('weather-future-temps').innerText = `H: ${Math.round(future.temperatureMax) + String.fromCharCode(176)}F, L: ${Math.round(future.temperatureMin) + String.fromCharCode(176)}F`;
    skycons.set("weather-future-icon", future.icon);
});