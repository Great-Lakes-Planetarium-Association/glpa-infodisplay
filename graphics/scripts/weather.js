// Require the weather replicant
const weather = nodecg.Replicant('weather');

// Load up Skycons
var skycons = new Skycons({ "color": "black" });
skycons.play();

// Do a weather update when data is available
weather.on('change', weather_data => 
{
    console.log('[weather]: Updated weather data received.');        
    
    // Handle current weather data stuff //
    // Set current temp
    document.getElementById('current-temp').innerText = weather_data.current.temperature;
    skycons.set('weather-current', weather_data.current.icon);

    // Today's forecast
    document.getElementById("weather-today-title").innerText = weather_data.today.day_name;
    document.getElementById('weather-today-temps').innerText = `H: ${weather_data.today.temperature_max}\nL: ${weather_data.today.temperature_min}`;
    skycons.set("weather-today-icon", weather_data.today.icon);

    // Update tomorrow's weather conditions
    document.getElementById("weather-tomorrow-title").innerText = weather_data.tomorrow.day_name;
    document.getElementById('weather-tomorrow-temps').innerText = `H: ${weather_data.tomorrow.temperature_max}\nL: ${weather_data.tomorrow.temperature_min}`;
    skycons.set("weather-tomorrow-icon", weather_data.tomorrow.icon);

    // Update future date
    document.getElementById("weather-future-title").innerText = weather_data.future.day_name;
    document.getElementById('weather-future-temps').innerText = `H: ${weather_data.future.temperature_max}\nL: ${weather_data.future.temperature_min}`;
    skycons.set("weather-future-icon", weather_data.future.icon);

    console.log('[weather]: Completed weather update.');
});