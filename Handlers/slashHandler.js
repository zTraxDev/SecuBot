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

    try {
        const rest = new REST({ version: '10'}).setToken(token);

        console.log('[SLASH] Empezando a registrar slash commands...');

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands
        });

        console.log('[SLASH] Comandos han sido cargados correctamente.');
    } catch (error) {
        console.error(`[SLASH HANDLER] Error al cargar los slash commands: ${error}`);
    }
}

module.exports = { InitCommands };

//Ahora vengo, dejare la sesion abierta
// vale, esta bien