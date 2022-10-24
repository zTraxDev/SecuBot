const { EmbedBuilder } = require("discord.js");
const logsSchema = require("../../Models/schemaLog");

module.exports = async (client, member) => {
  const welcomeMessage = new EmbedBuilder()
    .setTitle(`Welcome ${member.user.username}`)
    .setDescription(
      `Bienvenido ${member.user.tag} a ${member.guild.name}, eres el usuario ${member.guild.memberCount}`
    )
    .setThumbnail(member.user.displayAvatarURL())
    .setImage("https://i.imgur.com/4R47qJV.jpeg");

  let data = await logsSchema.findOne({ Guild: member.guild.id });
  if (data) {
    let channel = member.guild.channels.cache.get(data.Canal);
    await channel.send({ embeds: [welcomeMessage] })
  } else {
    return;
  }
}
