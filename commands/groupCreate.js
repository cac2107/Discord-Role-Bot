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
        let newGuild = true;
        let guildId = interaction.guild.id;
        let groupName = interaction.options.getString('group_name');

        groups.guilds.forEach(guild => {
            if(guild === guildId){ newGuild = false; }
        });
        
        if(newGuild){
            let guildJson = {}
            guildJson[guildId] = [];
            groups.guilds.push(guildJson)
        }

        let groupJson = {};
        groupJson[groupName] = [];
        console.log(groups);
        groups.guilds.forEach(guild => {
            if(guild === guildId){ 
                groups.guilds.guild.push(groupJson);
             }
        });

        fs.writeFileSync('./data/groups.json', JSON.stringify(groups, null, 2));

		await interaction.reply(`Created group ${groupName}!`);
	},
};