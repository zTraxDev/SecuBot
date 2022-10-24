const config = require("../../config.json");

module.exports = async (client, message) => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(config.prefix)) return;

    const [cmd, ...args] = message.content.slice(config.prefix.length).trim().split(" ");

    const command = client.comandos.get(cmd.toLowerCase()) || client.comandos.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    try {
        await command.run(client, message, args);
    } catch (e) {
        console.error(e);
    }
}

