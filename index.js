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

require('./deployAll');

client.login(process.env.TOKEN);
