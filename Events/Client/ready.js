const mongoose = require("mongoose")
const config = require("../../config.json")

module.exports = async (client) => {
   let prefix = "s!"
   client.user.setPresence([{ name: `Preparando la v0.1`, type: `WATCHING` }])
   mongoose.connect(config.mongodb || "", {
      KeepAlive: true,
   });

   if (mongoose.connect) {
      console.log(`La base de Datos Esta conectada✅`)
   }
   console.log(`Estoy Logeado Correctamente como ${client.user.tag}, Servidores ${client.guilds.cache.size}, usuarios ${client.users.cache.size}`)
}
