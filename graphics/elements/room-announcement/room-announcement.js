(function () {
	'use strict';
    var announceRoom1 = nodecg.Replicant('announceRoom1');
    var announceRoom2 = nodecg.Replicant('announceRoom2');
    var announceRoom3 = nodecg.Replicant('announceRoom3');
    var announceGlobal = nodecg.Replicant('announceGlobal');

    // Global announcements are not yet implemented.

    Polymer({
        is: 'room-announcement',

        properties:{
            announcement: {
                type: String
            },
            globalAnnouncement: {
                type: String
            }
        },

        ready() {
           
            // Get the room number from the URL
            var stream = Number(new URLSearchParams(window.location.search).get('stream'));
            if (!stream) {
                this.globalAnnouncement = "Please provide a ?stream= parameter.";
                return;
            }

            announceRoom1.on('change', newVal => {
                if (stream == 1){
                    if (newVal) {
                        this.injectBoundHTML(newVal, this.$.roomAnnouncementDiv)
                        this.$.roomAnnouncementDiv.style.display="block";
                    } else {
                        this.$.roomAnnouncementDiv.style.display="none";
                    }
                }
            });
            announceRoom2.on('change', newVal => {
                if (stream == 2){
                    if (newVal) {
                        this.$.roomAnnouncementDiv.style.display="block";
                        this.announcement = newVal;
                    } else {
                        this.$.roomAnnouncementDiv.style.display="none";
                    }
                }
            })
            announceRoom3.on('change', newVal => {
                if (stream == 3){
                    if (newVal) {
                        this.$.roomAnnouncementDiv.style.display="block";
                        this.announcement = newVal;
                    } else {
                        this.$.roomAnnouncementDiv.style.display="none";
                    }
                    
                }
            })
            announceGlobal.on('change', newVal => {
                if (newVal) {
                    this.$.globalAnnounceDiv.style.display = "block";
                    this.globalAnnouncement = newVal;
                } else {
                    this.$.globalAnnounceDiv.style.display = "none";
                }
            });
        }
    });

})()