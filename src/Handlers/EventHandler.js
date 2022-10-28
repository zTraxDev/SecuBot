const fs = require('fs');

class EventHandler {
    constructor(client) {
        this.client = client;
    }

    init() {
        fs.readdir('./src/events/', (err, folders) => {
            folders.forEach((folder) => {
                fs.readdir(`./src/events/${folder}`, (err, events) => {
                    events = events.filter(x => x.endsWith('.js'));
                    events.forEach((event) => {
                        const data = require(`../events/${folder}/${event}`);
                        this.client.on(event.split('.')[0], data.bind(null, this.client));
                    })
                })
            })
        })
    }
}

module.exports = EventHandler;