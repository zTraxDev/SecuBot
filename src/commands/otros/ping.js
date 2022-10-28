const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Obten el ping xd",

  async run(client, interaction) {
    let embed = new EmbedBuilder()
    .setDescription(`Mi ping es ${client.ws.ping}`);

    return interaction.reply({ embeds: [embed] })
  }
}// el slashCommandsBuilder no es obligatorio? // q mierda con esto  // que paso??