const { SlashCommandBuilder } = require('discord.js');
const groups = require("../data/groups.json");

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
                    let iter = 1;
                    group[Object.keys(group)[0]].forEach(role =>{
                        replyStr += `\t${iter}: ${role}\n`
                        iter += 1;
                    })
                })
            }
        });

        if(!exists){ await interaction.reply("Sorry, you have not created any groups yet!"); }
        else { await interaction.reply(replyStr); }
	},
};