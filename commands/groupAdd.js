const { SlashCommandBuilder } = require('discord.js');
const groups = require("../data/groups.json");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('groupadd')
		.setDescription('Adds a role to a role group.')
        .addStringOption(option =>
            option.setName('group_name')
                .setDescription('Name of the role group you wish to add to.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('role')
                .setDescription('Role that you wish to add to the group. Must be in @Role format.')
                .setRequired(true)),
	async execute(interaction) {
        let role = interaction.options.getString('role');
        let name = interaction.options.getString('group_name');
        let guildId = interaction.guild.id;

        if(!(role.startsWith("<@&"))){
            await interaction.reply("Sorry, that is not a role. Please use @Role format.");
            return;
        }

        if(groups.guilds[guildId] == undefined){
            await interaction.reply({content: "Sorry, your guild has not yet created any groups!", ephemeral: true});
            return;
        }
        if(groups.guilds[guildId][name] == undefined){
            await interaction.reply({content: `Sorry, ${name} is not a group that has been created. Use /listgroups to view created groups`, ephemeral: true});
            return;
        }

        groups.guilds[guildId][name].push(role);
        fs.writeFileSync('./data/groups.json', JSON.stringify(groups, null, 2));

        await interaction.reply({content: `Successfully added ${role} to group ${name}!`, ephemeral: true})
	},
};