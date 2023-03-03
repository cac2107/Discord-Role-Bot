const { SlashCommandBuilder } = require('discord.js');
const groups = require("../data/groups.json");
const menus = require("../data/menus.json");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolemenucreate')
		.setDescription('Create a role menu! Note: Part of this command cannot be private messages. Please plan accordingly.')
        .addStringOption(option => 
            option.setName("name")
                .setDescription("Name for React Menu")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("group")
                .setDescription("Name of role group to use for React Menu")
                .setRequired(true)
        ),
	async execute(interaction) {
        let guildId = interaction.guild.id;
        let groupName = interaction.options.getString('group');
        let menuName = interaction.options.getString('name');
        let roles = [];

        let foundGuild = false;
        let foundGroup = false;
        groups.guilds.forEach(guild => {
            if(Object.keys(guild)[0] == guildId){
                foundGuild = true;
                guild[guildId].forEach(group => {
                    if(Object.keys(group)[0] == groupName){
                        foundGroup = true;
                        roles = group[groupName];
                    }
                })
            }
        })

        if(!foundGuild){
            await interaction.reply({content: "Sorry, your guild has not created any groups yet!", ephemeral: true});
            return;
        } else if(!foundGroup){
            await interaction.reply({content: `Sorry, ${groupName} has not been created. Use /listgroups to see the groups that have been made.`});
            return;
        }

        let menu = {}
        roles.forEach(role => { menu[role] = ""; })

        if(menus.guilds[guildId] == undefined){ menus.guilds[guildId] = {}; }
        menus.guilds[guildId][menuName] = menu;

        fs.writeFileSync('./data/menus.json', JSON.stringify(menus, null, 2));

		await interaction.reply({content: `Created menu ${menuName}. I am sending a message for each role in the group ${groupName}. Please react to each message with the desired emoji.`, ephemeral: true});
        roles.forEach(async role => { await interaction.followUp({content: `menucreate ${menuName}: ${role}`}); })
	},
};