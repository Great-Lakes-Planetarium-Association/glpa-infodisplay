// Create document replicants
const conference = nodecg.Replicant('conference');

// General things to trigger when conference data is updated
conference.on('change', newval => {
    console.log(`conference: Received new conference.json from live.glpa.org.  Updating content.`);
    document.getElementById("header-title").innerText = newval.conference;
    document.getElementById("twitter-hashtag").innerText = newval.twitter.hashtag;
});

// Call the setClock functio after conference replicant is loaded
NodeCG.waitForReplicants(conference).then(() =>
{
    setClock();
});

// Set the clock on the page
function setClock()
{
    let timezone = conference.value.timezone;
    let now = new Date();
    document.getElementById("current-time").innerHTML = `
    <div class="clock-date">${now.toLocaleString("en-us", { "timeZone": timezone, "weekday": "long", "year": "numeric", "month": "numeric", "day": "numeric" })}</div>
    <div class="clock-time">${now.toLocaleString("en-us", { "timeZone": timezone, "hour": "numeric", "minute": "2-digit","second": "2-digit"})}</div>`;
    setTimeout(setClock, 500);
}