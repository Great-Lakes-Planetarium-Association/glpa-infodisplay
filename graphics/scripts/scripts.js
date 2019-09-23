// Create document replicants
const conference = nodecg.Replicant("conference");

// General things to trigger when conference data is updated
conference.on("change", newval => {
  nodecg.log.info('Processing updated conference data.');
  document.getElementById("block-header-title").innerText = newval.conference;
  document.getElementById("twitter-hashtag").innerText = newval.twitter.hashtag;
});

// Call the setClock functio after conference replicant is loaded
NodeCG.waitForReplicants(conference).then(() => {
  updateClock();
});

/** 
 * Sets the displayed clock information on the graphics page
 */
function setClock() {
  let now = new Date();
  document.getElementById("clock-day").innerText = now.toLocaleString("en-us", { timeZone: conference.value.timezone, weekday: "long" });
  document.getElementById("clock-date").innerText = now.toLocaleString("en-us", { timeZone: conference.value.timezone, year: "numeric", month: "numeric", day: "numeric" });
  document.getElementById("clock-time").innerText = now.toLocaleString("en-us", { timeZone: conference.value.timezone, hour: "numeric", minute: "2-digit" });
}

/** 
 * Recurring function to set the clock every 1 second 
 */
function updateClock() {
  setClock();
  setTimeout(updateClock, 1000);
}