const { SlashCommandBuilder } = require('discord.js');
const groups = require("../data/groups.json");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listgroups')
		.setDescription('Lists all created role groups for this guild.'),
	async execute(interaction) {
        let exists = false;
        const guildId = interaction.guild.id;
        let replyStr = "";
        groups.guilds.forEach(guild => {
            if(Object.keys(guild)[0] == guildId){
                exists = true;
                guild[guildId].forEach(group => {
                    replyStr += Object.keys(group)[0] + "\n";
                })
            }
        });

        if(!exists){
            await interaction.reply("Sorry, you have not created any groups yet!");
        } else {
            await interaction.reply(replyStr);
        }
	},
};