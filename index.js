const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require("./process.env");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);
