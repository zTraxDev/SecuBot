const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Mira la informacion de algun usuario!!')
    .addUserOption(o => o 
        .setName("usuario")
        .setDescription("Menciona un usuario")
        .setRequired(true)),



    run: async(interaction, client) => {
        let member = interaction.options.getMember("usuario") || interaction.member

        let roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1)

            displayRoles = roles.join(", ")
    let embed = new EmbedBuilder()
        .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}` })
    .addFields(
    { name: "ID:", value: `${member.user.id}`, inline: true },
    { name: "Apodo:", value: `${member.nickname || "Ninguno"}`, inline: true },
    { name: "Roles", value: `${displayRoles}`, inline: true },
    { name: "Fecha de creacion de cuenta:", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f>`, inline: false},
    { name: "Miembro de este servidor desde", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f>`, inline: false }
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setColor("Random")
        interaction.reply({ embeds: [embed] })

    }
    
}

    


