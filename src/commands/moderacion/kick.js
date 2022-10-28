const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "kick",
    description: "Staff Command",
    options: [
        {
            name: "usuario",
            description: "El usuario al que se le va a quitar la vida :pro:",
            type: 6,
            required: true
        },
        {
            name: "razon",
            description: "eso mismo",
            type: 3,
            required: false
        }
    ],

    async run(client, interaction){ // lo del rol se me olvido xd
       let usuario = interaction.options.getUser("usuario");
       let razon = interaction.options.getString("razon");

       let member = interaction.guild.members.resolve(usuario.id) || await client.users.fetch(usuario.id).catch(console.error)
       // xd?
       if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
          return interaction.reply("No Puedes expulsar a una persona con tu mismo rol")
       }

       if (interaction.member.id === member.id) return interaction.channel.send("No puedes expulsarte a ti mismo");

       let embed = new EmbedBuilder()
       .setTitle(`Expulsion`)
       .setDescription(`La sancion fue aplicada a ${usuario} por la razon ${razon}`)
       .setTimestamp()
       .setFooter({text: `Encargado ${interaction.author.tag}`})
        
       member.kick().then(() => {
        return interaction.reply({ embeds: [embed] })
       })
       
    }
}