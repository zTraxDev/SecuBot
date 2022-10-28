const { EmbedBuilder, SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bot-info")
    .setDescription("Mira la informacion de SecuBot"),

    async run(client, interaction){

        let embed = new EmbedBuilder()
        .setTitle(`Informacion de ${interaction.client.user.tag}`)
        .setAuthor({ 
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true})
        })
        .addFields(
            {name: `ID`, value: `${client.user.id}`, inline: true},
            {name: `Servidores`, value: `${client.guilds.cache.size}`, inline: false},
            {name: `Usuarios`, value: `${client.users.cache.size}`, inline: true},  
            {name: `Ping`, value: `${interaction.client.ws.ping}`, inline: true},
            {name: `Comandos`, value: `${client.commands.size}`, inline: true},
            { name: "Fecha de creacion", value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:f>`, inline: false},
        )
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp()
        .setColor("Random")

       await interaction.reply({ embeds: [embed] })
    }
}