const { Client, Collection,  } = require("discord.js");
const { token, clientId,  guildId } = require("./config.json");
const EventHandler = require("./Handlers/eventHandler");
const { InitCommands } = require("./Handlers/slashHandler");
const client = new Client({
    intents: 98175// En el handler,  esta mas para abajo
});

client.commands = new Collection();
client.events = new EventHandler(client);
client.events.init();

InitCommands(client);

const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(token);

// ...


// for global commands

// client.on("messageCreate", async (message) => {
//       if (message.author.bot || !message.guild || message.channel.type === "md") return;

//       var prefix =  config.prefix

//       if (!message.content.startsWith(prefix)) return;

//       const args = message.content.slice(prefix.length).trim().split("/ +/g");
//       const command = args.shift().toLocaleLowerCase();

//       let cmd = client.commands.find((c) => c.name  === command || (c.alias && c.alias.include(command)));
//       if (cmd){
//         cmd.run(client, message, args)
//       }
// })



client.login(token);