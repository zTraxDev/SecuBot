module.exports = async (client) => {
    const slashcommands = client.commands.map(x => x);
    await client.application.commands.set(slashcommands).then(console.log(`SlashCommands listos!`))
    
  
    console.log(`Estoy logeado como ${client.user.tag}`)
}