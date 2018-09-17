// Script handles loading the conference replicant which has data for the page

// Register the NodeCG conference replicant
conference = nodecg.Replicant('conference');
conference.hashtag = "#glpa2018";

// Watch for a change to the conference replicant
conference.on('change', conferenceData => {
    console.log(`conference: Received new conference.json from live.glpa.org.  Updating content.`);
    document.getElementById("header-title").innerText = conferenceData.conference;
    document.getElementById("twitter-hashtag").innerText = "#glpa2018";
});