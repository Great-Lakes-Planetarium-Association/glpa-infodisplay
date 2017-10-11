(function () {
    'use strict';
    var announceRoom1 = nodecg.Replicant('announceRoom1');
    var announceRoom2 = nodecg.Replicant('announceRoom2');
    var announceRoom3 = nodecg.Replicant('announceRoom3');
    var announceGlobal = nodecg.Replicant('announceGlobal');

    Polymer({
        is: 'room-announcement',

        properties: {
            globalAnnouncement: {
                type: Number
            },
            room1Announcement: {
                type: String
            },
            room2Announcement: {
                type: String
            },
            room3Announcement: {
                type: String
            }
        },
        
        ready() {
            // Room 1 announcements
            this.$.r1take.addEventListener('click', () => {
                announceRoom1.value = this.room1Announcement;
            });
            this.$.r1clear.addEventListener('click', () => {
                announceRoom1.value = "";
            });
            announceRoom1.on('change', newVal => {
                this.room1Announcement = announceRoom1.value
            });

            // Room 2 announcements
            this.$.r2take.addEventListener('click', () => {
                announceRoom2.value = this.room2Announcement;
            });
            this.$.r2clear.addEventListener('click', () => {
                announceRoom2.value = "";
            });
            announceRoom2.on('change', newVal => {
                this.room2Announcement = announceRoom2.value
            });

            // Room 3 announcements
            this.$.r3take.addEventListener('click', () => {
                announceRoom3.value = this.room3Announcement;
            });
            this.$.r3clear.addEventListener('click',() => {
                announceRoom3.value = "";
            })
            announceRoom3.on('change', newVal => {
                this.room3Announcement = announceRoom3.value
            });

            // Global Announcements
            this.$.gtake.addEventListener('click', () => {
                announceGlobal.value = this.globalAnnouncement;
            });
            this.$.gclear.addEventListener('click', () => {
                announceGlobal.value = "";
            })
            announceGlobal.on('change', newVal => {
                this.globalAnnouncement = announceGlobal.value
            });
        }
    });    
})()