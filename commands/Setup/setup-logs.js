Schema = require ("../../Models/schemaLog");
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setlog")
    .setDescription("Configura un canal de despedidas")
    .addChannelOption((option) => {
        return option
        .setName('canal')
        .setDescription('Selecciona el canal de despedidas')
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
       interaction.reply(`${channel} **Se ha configurado como el canal de logs**`);
     });
   },
};