// Get conference replicant
conference = nodecg.Replicant("conference");
nodecg.waitForReplicants(conference).then(() => {
    confTimezone = conference.value.timezone;

    // Function calculates the current date time information and sets the appropriate div.
    function printClock() {
        var now = new Date();
        document.getElementById("current-time").innerHTML = `
        <div class="clock-date">${now.toLocaleString("en-us", { "timeZone": confTimezone, "weekday": "long", "year": "numeric", "month": "numeric", "day": "numeric" })}</div>
        <div class="clock-time">${now.toLocaleString("en-us", { "timeZone": confTimezone, "hour": "numeric", "minute": "2-digit","second": "2-digit"})}</div>`;
        setTimeout(printClock, 500);
    }

    printClock();
});