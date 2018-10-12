// Create document replicants
const conference = nodecg.Replicant('conference');


// Call functions after a replicant loads
NodeCG.waitForReplicants(conference).then(() => {

    // Set the clock once we have timezone data
    setClock(conference.value.timezone);

});

function setClock(timezone)
{
    var now = new Date();
    document.getElementById("current-time").innerHTML = `
    <div class="clock-date">${now.toLocaleString("en-us", { "timeZone": timezone, "weekday": "long", "year": "numeric", "month": "numeric", "day": "numeric" })}</div>
    <div class="clock-time">${now.toLocaleString("en-us", { "timeZone": timezone, "hour": "numeric", "minute": "2-digit","second": "2-digit"})}</div>`;
    setTimeout(setClock(timezone), 500);
}
