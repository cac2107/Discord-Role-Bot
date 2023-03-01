const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Run the command... DO IT!'),
	async execute(interaction) {
		await interaction.reply('P-P-P-PONGGGGG!');
	},
};