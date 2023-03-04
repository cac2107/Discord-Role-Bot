const { SlashCommandBuilder, ChannelType } = require('discord.js');
const menus = require("../data/menus.json");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setadminchannel')
		.setDescription('Sets the channel to send menu interaction information to.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('#channel to send the information to. Please use #channel format')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)),
	async execute(interaction) {
        let channel = interaction.options.getChannel('channel').id;
        let guildId = interaction.guild.id;

        if(menus.guilds[guildId] == undefined){ menus.guilds[guildId] = {}; }

        menus.guilds[guildId]["admin-channel"] = channel;
        fs.writeFileSync("./data/menus.json", JSON.stringify(menus, null, 2));

		await interaction.reply({content: 'Successfully set admin channel!', ephemeral: true});
	},
};