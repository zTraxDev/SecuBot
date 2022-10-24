const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionsBitField}= require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Expulsa a un usuario del servidor")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
        .addUserOption(option => 
            option
                .setName("user")
                .setDescription("El usuario a expulsar")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("La razon de la expulsión")
                .setRequired(false)
        ),
    
  /**
   * @param {ChatInputCommandInteraction} interaction
   */


    async run(client, interaction){
        const User = interaction.options.getUser('user');
        const reason = interaction.options.getString("reason") || "No especificada";
        const MemberRoles = interaction.member.roles.highest;
        const Roles = interaction.guild.members.cache.get(User.id).roles.highest;
        const Bot = interaction.guild.members.me.roles.highest;
        


        if(User.id === interaction.member.id) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#00FFC5 ")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedes expulsarte a ti mismo ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });

        if(User.id === interaction.guild.members.me.id) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#00FFC5 ")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedes expulsarme ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });

        if(User.id === interaction.guild.ownerId) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#C03D20")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedes expulsar a un Developer ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        })

        if(User.id !== interaction.guild.ownerId && Roles.comparePositionTo(MemberRoles) >= 0) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#57ED69")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedes expulsar a una persona con un rol mayor al tuyo ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });

        if(Roles.comparePositionTo(Bot) > 0) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#00FFC5 ")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No puedo expulsar a alguien con un rol superior al mio ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });

        if(!interaction.member.permissions.has("KickMembers")) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#00FFC5 ")
                .setTitle(`Error ${interaction.user.tag}`)
                .setDescription(`No tienes permisos para usar este comando ${interaction.user.username}`)
                .setTimestamp()
            ],
            ephemeral: true
        });
        await interaction.guild.members.kick(User.id, `${interaction.member.user.tag} - ${reason}`).then(async () => {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#2f3136')
                        .setDescription(`**${User.tag}** Ha sido Expulsado de ${interaction.guild.name}.`)
                ]
            });
        })  
    }
}//Buenas xd
