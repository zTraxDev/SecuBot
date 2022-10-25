const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require(`discord.js`);
const Schema = require("../../Models/schemaSugerencias");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sugerencias")
    .setDescription("Envia una Sugerencia")
    .addStringOption((o) =>
      o
        .setName("sugerencia")
        .setDescription("Describe tu Sugerencia")
        .setRequired(true)
    ),

  async run(client, interaction) {
    const text = interaction.options.getString("sugerencia");

    let data = await Schema.findOne({ Guild: interaction.guildId });
    if (data) {
      let canal = interaction.guild.channels.cache.get(data.Canal);

      let embed = new EmbedBuilder()
        .setTitle(`Sugerencia de ${interaction.user.tag}`)
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(`${text}`)
        .setTimestamp()
        .setColor("Blue");

      canal.send({ embeds: [embed] }).then((msg) => {
        msg.react(`✅`);
        msg.react(`❌`);
      });

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setDescription(
              `Tu sugerencia fue enviada al Canal ${interaction.guild.channels.cache.get(data.Canal)}`
            )
            .setThumbnail(interaction.user.displayAvatarURL()),
        ],
        ephemeral: true,
      });
    } else { 
      return interaction.reply({ content: "No se ha establecido un canal de sugerencia", ephemeral: true})
    }
  }
};
