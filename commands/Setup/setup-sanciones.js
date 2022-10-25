Schema = require("../../Models/schemaSanciones");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-logsanciones")
    .setDescription("Configura un canal de Sugerencias")
    .addChannelOption((option) => {
      return option
        .setName("canal")
        .setDescription("Selecciona el canal de sugerencias que quieres poner")
        .setRequired(true);
    }),

  run: async (client, interaction) => {
    let channel = interaction.options.getChannel("canal");

    let data = await Schema.findOne({ Guild: interaction.guildId })
    if (data) {
      data.Canal = channel.id;
      data.save();
    } else {
      let newData = Schema({
        Guild: interaction.guildId,
        Canal: channel.id,
      });
      newData.save();
    }

    return await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Canal establecido✅`)
          .setDescription(
            `${channel} Se ha establecido como canal de log de Sanciones`
          )
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true })),
      ],
      ephemeral: true
    });
  },
};
