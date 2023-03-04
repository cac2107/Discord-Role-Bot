const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sendreactmenu')
		.setDescription('Sends the specified react menu to the specified channl.')
        .addStringOption(option =>
            option.setName('menu_name')
                .setDescription('Name of menu you wish to send.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('#channel you wish to send the menu to. Use #channel format.')
                .setRequired(true)),
	async execute(interaction) {
        const guildId = interaction.guild.id;
        const menuName = interaction.options.getString('menu_name');
        let channelId = interaction.options.getString('channel');
        let menus = JSON.parse(fs.readFileSync('./data/menus.json'));

        if(!(channelId.startsWith("<#"))){
            await interaction.reply({content: "Sorry, that is not a valid channel. Please use #channel format", ephemeral: true});
            return;
        }
        if(menus.guilds[guildId] == undefined){
            await interaction.reply({content: "Sorry, your guild has not created any menus yet. Please use the /menucreate command.", ephemeral: true});
            return;
        }
        if(menus.guilds[guildId][menuName] == undefined){
            await interaction.reply({content: "Sorry, that menu name is not valid. Please use /listmenus to view valid created menus.", ephemeral: true});
            return;
        }

        let menuEmbed = {color: 0x05f2e6, title: `Role Menu: ${menuName}`, description: "React to Choose a Role!", fields: []};
        let emojis = []
        Object.keys(menus.guilds[guildId][menuName]).forEach(async role => {
            let emoji = menus.guilds[guildId][menuName][role]['emoji'];
            let desc = menus.guilds[guildId][menuName][role].desc;
            if(emoji == ""){
                await interaction.reply({content: "Sorry, not all roles have been assigned an emoji", ephemeral: true});
                return;
            }
            let field = {name: emoji, value: role + "\n"};
            emojis.push(emoji);
            if(!(desc == "")){ field['value'] += desc; }
            menuEmbed.fields.push(field);
        })

        channelId = channelId.replace("<#", "").replace(">", "");
        const channel = client.channels.cache.get(channelId);
        let message = await channel.send({embeds: [menuEmbed]});

        emojis.forEach(async emoji => { await message.react(emoji); })

		await interaction.reply({content: 'Successfully sent react menu.', ephemeral: true});
	},
};