const fs = require("fs");

class EventHandler {
  constructor(client) {
    this.client = client;
  }

  init() {
    fs.readdir("./Events/", (err, folders) => {
      folders.forEach((folder) => {
        fs.readdir(`./Events/${folder}`, (err, events) => {
          events = events.filter((x) => x.endsWith(".js"));
          events.forEach((event) => {
            const data = require(`../Events/${folder}/${event}`);
            this.client.on(event.split(".")[0], data.bind(null, this.client));
          })
        })
      });
    })
  }
}

module.exports = EventHandler;