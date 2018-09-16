// Function calculates the current date time information and sets the appropriate div.
var dateformat = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
var timeformat = { hour: 'numeric', minute: '2-digit', second: '2-digit'}
var shorttimeformat = { hour: 'numeric', minute: '2-digit' }
function printClock() {
    var now = new Date();
    document.getElementById('current-time').innerHTML =
        '<div class="clock-time">' + now.toLocaleTimeString("en-us", timeformat) + '</div>' +
        '<div class="clock-date">' + now.toLocaleDateString("en-us", dateformat) + '</div>';
    setTimeout(printClock, 500);
}

printClock();