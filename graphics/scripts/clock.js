// Function calculates the current date time information and sets the appropriate div.
var dateformat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
var timeformat = { hour: 'numeric', minute: '2-digit', second: '2-digit'}
var shorttimeformat = { hour: 'numeric', minute: '2-digit' }
function getDateTime() {
    var now = new Date();
    document.getElementById('clock').innerHTML =
    '<div class="clock-date">' + now.toLocaleDateString("en-us", dateformat) + '</div>' +
    '<div class="clock-time">' + now.toLocaleTimeString("en-us", timeformat) + '</div>';
    setTimeout(getDateTime, 500);
}
