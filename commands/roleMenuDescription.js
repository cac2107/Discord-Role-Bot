const { SlashCommandBuilder } = require('discord.js');
const menus = require("../data/menus.json");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolemenudescription')
		.setDescription('Adds a description to a role in a role menu.')
        .addStringOption(option => 
            option.setName("menu_name")
                .setDescription("Name of the menu you wish to add a description to.")
                .setRequired(true))
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('The role in the menu you wish to add the description to.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('description')
                .setDescription("Write the description here.")
                .setRequired(true)),
	async execute(interaction) {
        const guildId = interaction.guild.id;
        const roleChoice = interaction.options.getRole('role');
        const menuName = interaction.options.getString('menu_name');
        const description = interaction.options.getString('description');

        if(menus.guilds[guildId] == undefined){
            await interaction.reply({content: "Sorry, you have not created any role menus yet.", ephemeral: true});
            return;
        }
        if(menus.guilds[guildId][menuName] == undefined){
            await interaction.reply({content: "Sorry, that menuname is invalid.", ephemeral: true});
            return;
        }
        if(menus.guilds[guildId][menuName][roleChoice] == undefined){
            await interaction.reply({content: `Sorry, that role is not a part of ${menuName}`, ephemeral: true});
            return;
        }

        menus.guilds[guildId][menuName][roleChoice].desc = description;
        fs.writeFileSync("./data/menus.json", JSON.stringify(menus, null, 2));

		await interaction.reply({content: "Successfully added the description!", ephemeral: true});
	},
};