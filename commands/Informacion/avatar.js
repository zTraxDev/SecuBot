const { EmbedBuilder, SlashCommandBuilder, Client } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Mira el avatar del usuario")
    .addUserOption(o => o
        .setName("usuario")
        .setDescription("Selecciona el usuario que quieres ver su avatar")
        ),

    async run(client, interaction){

        let user = interaction.options.getUser("usuario")

        let embed = new EmbedBuilder()
        .setTitle(`Avatar de ${user.tag}`)
        .setImage(`${user.displayAvatarURL({ dynamic: true, size: 4096})}`)
        .setFooter({ text: `Solicitado por ${interaction.user.tag}`})
        .setTimestamp()
        .setColor("Random")

        await interaction.reply({ embeds: [embed]})
    }
}