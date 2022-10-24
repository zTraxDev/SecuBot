const { EmbedBuilder } = require("discord.js")

module.exports = async (client, member) => {
    const { user, guild } = member;
    const LeaveChannel = member.guild.channels.cache.get("1016791668902596658");
    const LeaveMessage = new EmbedBuilder()
        //-------------------------------  Salida  -------------------------------------//
        .setTitle(`Salida de ${member.user.tag}`)
        .setDescription(`${member.user.tag} Vuelve Pronto a ${member.guild.name}`)
}
