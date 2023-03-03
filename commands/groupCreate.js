const { SlashCommandBuilder } = require('discord.js');
const groups = require("../data/groups.json");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('groupcreate')
		.setDescription('Creates a group of roles for use with a role menu.')
        .addStringOption(option =>
            option.setName("group_name")
            .setDescription("Name for the role group.")
            .setRequired(true)),
	async execute(interaction) {
        let guildId = interaction.guild.id;
        let groupName = interaction.options.getString('group_name');

        if(groups.guilds[guildId] == undefined){groups.guilds[guildId] = {}; }
        groups.guilds[guildId][groupName] = [];

        fs.writeFileSync('./data/groups.json', JSON.stringify(groups, null, 2));

		await interaction.reply({content: `Created group ${groupName}!`, ephemeral: true});
	},
};