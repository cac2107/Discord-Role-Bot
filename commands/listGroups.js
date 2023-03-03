const { SlashCommandBuilder } = require('discord.js');
const groups = require("../data/groups.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listgroups')
		.setDescription('Lists all created role groups for this guild.'),
	async execute(interaction) {
        const guildId = interaction.guild.id;
        let replyStr = "";

        if(groups.guilds[guildId] == undefined){
            await interaction.reply({content: "Sorry, you have not created any groups yet!", ephemeral: true});
            return;
        }

        let firstMain = true;
        Object.keys(groups.guilds[guildId]).forEach(group => {
            if(firstMain){ firstMain = false; }
            else { replyStr += "\n\n"; }

            replyStr += `${group} -> `

            let first = true;
            groups.guilds[guildId][group].forEach(role => {
                if(first){ first = false; }
                else{ replyStr += ", "; }

                replyStr += role;
            })
        })

        await interaction.reply({content: replyStr, ephemeral: true});
	},
};