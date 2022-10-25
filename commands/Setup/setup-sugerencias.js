Schema = require("../../Models/schemaSugerencias");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-sugerencias")
    .setDescription("Configura un canal de Sugerencias")
    .addChannelOption((option) => {
      return option
        .setName("canal")
        .setDescription("Selecciona el canal de sugerencias que quieres poner")
        .setRequired(true);
    }),

  run: async (client, interaction) => {
    let channel = interaction.options.getChannel("canal");

    await Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (err) return console.log(err);
      if (data) {
        data.Channel = channel.id;
        data.save();
      }else {
        let newData = Schema({
          Guild: interaction.guildId,
          Canal: channel.id,
        });
        newData.save();
      }

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Canal Establecido ✅`)
            .setDescription(
              `${channel} Se ha establecido como canal de sugerencias`
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true })),
        ],
        ephemeral: true
      });
    });
  },
};
