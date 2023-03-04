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

        let menuEmbed = {title: "Menus", fields: []};

        Object.keys(menus.guilds[guildId]).forEach(menu => {
            if(!(menu == "admin-channel")){
                field = {name: menu, value: ""}
                fieldValue = ""

                let first = true;
                Object.keys(menus.guilds[guildId][menu]).forEach(async role => {
                    let emoji = menus.guilds[guildId][menu][role].emoji;
                    let desc = menus.guilds[guildId][menu][role].desc;
                    if(emoji == ""){
                        await interaction.reply({content: "Sorry, not all roles have been assigned an emoji", ephemeral: true});
                        return;
                    }
                    if(first){ first = false; }
                    else { fieldValue += "\n"; }

                    fieldValue += `${role}: ${emoji}`;

                    if(desc == ""){ fieldValue += "\n"; }
                    else{fieldValue += `\n\t${desc}\n`}

                    field.value = fieldValue;
                })
                menuEmbed.fields.push(field);
            }
        })

        if(menuEmbed.fields.length == 0){
            await interaction.reply({content: "Sorry, it seems you have not created any menus yet!", ephemeral: true});
            return;
        }

        await interaction.reply({embeds: [menuEmbed], ephemeral: true});
	},
};