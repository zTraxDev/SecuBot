const { REST, Routes } = require('discord.js');
const { readdirSync } = require('node:fs');
const { token, guildId, clientId } = require('../config.json');

async function InitCommands(client) {
    const commands = [];

    readdirSync('./commands/').forEach(dir => {
        const command = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (const file of command) {
            const cmd = require(`../commands/${dir}/${file}`);
            commands.push(cmd.data.toJSON());
            client.commands.set(cmd.data.name, cmd);
            delete require.cache[require.resolve(`../commands/${dir}/${file}`)];
        }
    });
}

module.exports = { InitCommands };