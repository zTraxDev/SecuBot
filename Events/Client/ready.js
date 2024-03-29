const mongoose = require("mongoose")
const config = require("../../config.json")
const { ActivityType } = require("discord.js")

module.exports = async (client) => {
   const slashcommands = client.commands.map(x => x.data);
  await client.application.commands.set(slashcommands).then(console.log("[SLASH] Se han registrado los comandos"));

   client.user.setPresence({ activities:  [{ name: `Preparando la v0.1` }], status: `idle` })
   mongoose.connect(config.mongodb || "", {
      KeepAlive: true,
   });

   if (mongoose.connect) {
      console.log(`La base de Datos Esta conectada✅`)
   }
   console.log(`Estoy Logeado Correctamente como ${client.user.tag}, Servidores ${client.guilds.cache.size}, usuarios ${client.users.cache.size}`)
}
