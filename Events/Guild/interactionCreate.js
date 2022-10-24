const { InteractionType } = require('discord.js');

module.exports = async (client, Interaction) => {
    if (!Interaction.type === InteractionType.ApplicationCommand) return;

    const command = Interaction.client.commands.get(Interaction.commandName);
    if (!command) return;

    try {
        await command.run(client, Interaction);
    } catch (error) {
        console.error(error);
        await Interaction.reply({ content: 'Hubo un error al ejecutar el comando, porfavor intentelo de uevo', ephemeral: true });
    }
}
