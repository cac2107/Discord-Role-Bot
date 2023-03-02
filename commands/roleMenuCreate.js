const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolemenucreate')
		.setDescription('Create a role menu!')
        .addStringOption(option => 
            option.setName("name")
                .setDescription("Name for React Menu")
                .setRequired(true)),
	async execute(interaction) {
		await interaction.reply('This command is underdevelopment!');
	},
};