const { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField}= require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Schema = require("../../Models/schemaSanciones")
//patron, todo en orden
//Negrooo, mira el codigo mas para abajo
// procedo a visualizar tu vaina
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
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("La razon del Baneo")
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

        

//Que vrg xd //  ye
        let data = await Schema.findOne({ User: User.id });

        if(data){
            let datos = data.Sancion || [];
            datos.push({
                "razon": reason,
                "moderador": interaction.user.id,
                "date": Date.now()
            })

          data.Sancion = datos;
          await data.save()
        } else {
            let datos = []
            datos.push({
                "razon": reason,
                "moderador": interaction.user.id,
                "date": Date.now()
            })

            let newData = Schema({
                Sancion: datos,
                User: User.id
            })

            await newData.save()
        }


        let date = await Schema.findOne({ Guild: interaction.guildId });
        if (date) {
          let canal = interaction.guild.channels.cache.get(data.Canal);
    
          let embed = new EmbedBuilder()
            .setTitle(`Log de Sanciones`)
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .addFields(
                {name: `Usuario`, value: `${User.tag}`}
            )
            .setTimestamp()
            .setColor("Blue");
    
          canal.send({ embeds: [embed] }).then((msg) => {
            msg.react(`✅`);
            msg.react(`❌`);
          });

         }

        

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
                        .setDescription(`**${User.tag}** Ha sido Baneado de ${interaction.guild.name}`)
                        .setTimestamp()
                ]
            });
        })  
    }
}//Buenas xd
