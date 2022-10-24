Schema = require ("../../Models/schemaSugerencias");
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("set-sugerencias")
    .setDescription("Configura un canal de Sugerencias")
    .addChannelOption((option) => {
        return option
        .setName('canal')
        .setDescription('Selecciona el canal de sugerencias que quieres poner')
        .setRequired(true)
    }),
   
  run: async (interaction) => {  
      let channel = interaction.options.getChannel('canal')
  
       
       Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
         if(err) return console.log(err)
         if(data) {
           data.Channel = channel.id;
           data.save();
         } 
         
         if(!data){
          data.Channel = channel.id
          data.save
         }
         else {
           new Schema({
             Guild: interaction.guild.id,
             Channel: channel.id,
           }).save();
         }
         interaction.reply({ embeds: [
          new EmbedBuilder()
          .setTitle(`Exito ✅`)
          .setDescription(`${channel} Se ha establecido como canal de sugerencias`)
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true}))
         ]});
       });
     },
  };