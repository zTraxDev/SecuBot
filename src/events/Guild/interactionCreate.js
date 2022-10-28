const { InteractionType } = require("discord.js");

module.exports = async (client, Interaction) => {
    if (!Interaction.type === InteractionType.ApplicationCommand) return;

    const cmd = client.commands.get(Interaction.commandName);
    if (!cmd) return;

    try {
        await cmd.run(client, Interaction);
    } catch (e) {
        console.error(e);
    }
}