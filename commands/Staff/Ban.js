const { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField}= require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
//patron, todo en orden
// ola 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Banea un usuario del servidor")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
        .addUserOption(option => 
            option
                .setName("user")
                .setDescription("El usuario a Banear")
                .setRequired(true)
        )
        .addIntegerOption(option => 
            option
                .setName("dias")
                .setDescription("Dias de Baneo")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("La razon del Baneo")
                .setRequired(false)
        ),
    
  /**
   * @param {ChatInputCommandInteraction} interaction
   */


    async run(interaction){
        const User = interaction.options.getUser('user');
        const reason = interaction.options.getString("reason") || "No especificada";
        const MemberRoles = interaction.member.roles.highest;
        const Roles = interaction.guild.members.cache.get(User.id).roles.highest;
        const Bot = interaction.guild.members.me.roles.highest;
        const days = interaction.options.get("dias")?.value || 7;
        
        if(User.id === interaction.member.id) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#00FFC5 ")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedes Banearte a ti mismo ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });

        if(User.id === interaction.guild.members.me.id) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#00FFC5 ")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedes Banearme:) ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });

        if(User.id === interaction.guild.ownerId) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#C03D20")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedes Banear a un Developer ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        })

        if(User.id !== interaction.guild.ownerId && Roles.comparePositionTo(MemberRoles) >= 0) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#57ED69")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedes Banear a una persona con un rol mayor al tuyo ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });

        if(Roles.comparePositionTo(Bot) > 0) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#00FFC5 ")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedo Banear a alguien con un rol superior al mio ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });

        if(!interaction.member.permissions.has("BanMembers")) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#00FFC5 ")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No tienes permisos para usar este comando ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });
        
        await interaction.guild.members.ban(User.id, { reason: `${interaction.member.user.tag} - ${reason}` })
          .then(async () => {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#2f3136')
                        .setDescription(`**${User.tag}** Ha sido Baneado de ${interaction.guild.name} por ${days} dias.`)
                        .setTimestamp()
                ]
            });
        })  
    }
}//Buenas xd
