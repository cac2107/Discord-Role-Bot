const { SlashCommandBuilder } = require('discord.js');
const menus = require("../data/menus.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listmenus')
		.setDescription('Lists all created menus'),
	async execute(interaction) {
        const guildId = interaction.guild.id;
        if(menus.guilds[guildId] == undefined){
            await interaction.reply({content: "Sorry, it seems you have not created any menus yet!", ephemeral: true});
            return;
        }

        let replyStr = "";
        let first = true;
        Object.keys(menus.guilds[guildId]).forEach(menu => {
            if(!(menu == "admin-channel")){
                if(first){ first = false; }
                else{ replyStr += "\n"; }
                replyStr += `${menu}:`
                Object.keys(menus.guilds[guildId][menu]).forEach(async role => {
                    let emoji = menus.guilds[guildId][menu][role].emoji;
                    let desc = menus.guilds[guildId][menu][role].desc;
                    if(emoji == ""){
                        await interaction.reply({content: "Sorry, not all roles have been assigned an emoji", ephemeral: true});
                        return;
                    }
                    replyStr += `\n\t${role}: ${emoji}`;
                    if(desc == ""){ replyStr += "\n"; }
                    else{replyStr += `\n\t${desc}\n`}
                })
            }
        })

        if(replyStr == ""){
            await interaction.reply({content: "Sorry, it seems you have not created any menus yet!", ephemeral: true});
            return;
        }

        await interaction.reply({content: replyStr, ephemeral: true});
	},
};