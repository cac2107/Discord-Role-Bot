const fs = require('node:fs');
const { Collection, REST, Routes } = require('discord.js');
const path = require('node:path');
require("dotenv").config();

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Deleting all commands
// const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
// console.log("Deleting all Commands...");
// rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);

console.log("\u001b[1m\u001b[36mLoading Commands...\u001b[0m");
for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
        console.log(`\t\u001b[36mLoaded Command:\u001b[0m ${file}`);
    } else {
        console.log(`WARNING: The command at ${filePath} is missing either 'data' or 'execute' property`);
    }
}

const events = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`\u001b[1m\u001b[35mLoading Events...\u001b[0m`);

for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`\t\u001b[35mLoaded Event:\u001b[0m ${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};
