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
    console.log(data);

    if (data) {
      let canal = client.guilds.cache
        .get(interaction.guildId)
        .channels.cache.get(data.Canal);

      canal.send({ content: text }).then((msg) => {
        msg.react(`✅`);
        msg.react(`❌`);
      });
    }

    let embed = new EmbedBuilder()
      .setTitle(`Sugerencia de ${interaction.user.tag}`)
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .addFields({ name: `**Sug**`, value: `**${text}**` })
      .setTimestamp()
      .setColor("Blue");

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setDescription(
            `Tu sugerencia fue enviada al Canal ${sugerenciaCanal}`
          )
          .setThumbnail(interaction.user.displayAvatarURL()),
      ],
      ephemeral: false,
    });

    if (!text)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Error ❌`)
            .setDescription(
              `Debes de Espesificar un Texto para enviar la Sugerencia ${interaction.user.tag}`
            ),
        ],
      });

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.ManageChannels
      )
    )
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Error ❌`)
            .setDescription(
              `No tengo los permisos nesecarios ❌ | Nesecito el rol **GESTIONAR CANALES** para enviar sugerencias!`
            ),
        ],
      });

    console.log(`El Mensaje Se envio Correctamente ✅`);
  },
};
