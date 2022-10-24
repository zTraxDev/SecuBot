const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Muestra el ping del bot"),

  async run(interaction) {
    const pingEmbed = new EmbedBuilder()
      .setTitle(`Conexion de ${interaction.client.user.tag}`)
      .setDescription(`Mi conexion es ${interaction.client.ws.ping}ms`)
      .setTimestamp();

    await interaction.reply({ embeds: [pingEmbed] });
  },
};
