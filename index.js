require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

global.client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.GuildMessageReactions],
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction]});

// client.once(Events.ClientReady, c => {
// 	console.log(`Ready! Logged in as ${c.user.tag}`);
// });

require('./deployAll');

client.login(process.env.TOKEN);
