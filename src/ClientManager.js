const { Client, Collection } = require("discord.js");
const { token } = require("../config.json");

const EventHandler = require("./Handlers/EventHandler.js");
module.exports = class ClientManager extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
  }

  setup() {
    this.events = new EventHandler(this);
    this.events.init();

    require("./Handlers/CommandHandler.js")(this);
    this.login(token);
  }
};
