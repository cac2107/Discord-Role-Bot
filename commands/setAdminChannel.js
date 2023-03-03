const { SlashCommandBuilder } = require('discord.js');
const menus = require("../data/menus.json");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setadminchannel')
		.setDescription('Sets the channel to send menu interaction information to.')
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('#channel to send the information to. Please use #channel format')
                .setRequired(true)),
	async execute(interaction) {
        let channel = interaction.options.getString('channel');
        let guildId = interaction.guild.id;

        if(!(channel.startsWith("<#"))){
            await interaction.reply({content: "Sorry, that is not a channel. Please use #channel format."})
            return;
        }

        channel = channel.replace("<#", "").replace(">", "");
        menus.guilds[guildId]["admin-channel"] = channel;
        fs.writeFileSync("./data/menus.json", JSON.stringify(menus, null, 2));

		await interaction.reply({content: 'Successfully set admin channel!', ephemeral: true});
	},
};