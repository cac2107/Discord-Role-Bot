require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const path = require('node:path');
const fs = require('fs');

global.client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.GuildMessageReactions],
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction]});

const dataPath = path.join(__dirname, 'data');
const dataFiles = fs.readdirSync(dataPath).filter(file => file.endsWith('.json'));
if(dataFiles.length == 0){
	console.log("No data files found... Creating now");
	require('./dataFilesCreate');
}

require('./deployAll');


client.login(process.env.TOKEN);
