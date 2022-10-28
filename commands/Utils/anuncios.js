const { EmbedBuilder, SlashCommandBuilder, Client} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("anuncio")
    .setDescription("Mandar un anuncio a un canal determinado")
    .addStringOption(o => o
        .setName("mensaje")
        .setDescription("Especifica el mensaje que se enviara al canal de Anuncios")
        .setRequired(true)
        ),

   async run(client, interaction){

        let texto = interaction.options.getString("texto")
        
   }
}