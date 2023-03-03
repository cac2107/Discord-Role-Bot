const { SlashCommandBuilder } = require('discord.js');
const groups = require("../data/groups.json");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('groupadd')
		.setDescription('Adds a role to a role group.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the role group you wish to add to.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('role')
                .setDescription('Role that you wish to add to the group. Must be in @Role format.')
                .setRequired(true)),
	async execute(interaction) {
        let role = interaction.options.getString('role');
        let name = interaction.options.getString('name');
        let guildId = interaction.guild.id;

        if(!(role.startsWith("<@&"))){
            await interaction.reply("Sorry, that is not a role. Please use @Role format.");
            return;
        }
		
        let foundGuild = false;
        let foundGroup = false;
        console.log(groups);
        groups.guilds.forEach(guild => {
            if(Object.keys(guild)[0] == guildId){
                foundGuild = true;
                guild[guildId].forEach(groupName => {
                    if(Object.keys(groupName) == name){
                        foundGroup = true;
                        groupName[name].push(role);
                        fs.writeFileSync('./data/groups.json', JSON.stringify(groups, null, 2));
                    }
                });
            }
        });

        if(!foundGuild){ await interaction.reply({content: "Sorry, your guild has not yet created any groups!", ephemeral: true}) }
        else if (!foundGroup) { await interaction.reply({content: `Sorry, ${name} is not a group that has been created. Use /listgroups to view created groups`, ephemeral: true}); }
        else { await interaction.reply({content: `Successfully added ${role} to group ${name}!`, ephemeral: true})}
	},
};