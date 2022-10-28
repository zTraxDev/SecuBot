const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "creditos",
    description: "Creadores del bot",

    async run(client, interaction){
        let embed = new EmbedBuilder()
        .setTitle("Creditos")
        .setDescription(`Los creadores del bot son:\n${client.users.cache.get("437003483594489856").username}\n${client.users.cache.get("506103750600163380").username}`)
        return interaction.reply({ embeds: [embed] } );
    } // Ahora si xd, 
}