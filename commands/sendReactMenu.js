const { SlashCommandBuilder } = require('discord.js');

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

        let menuStr = `Role Menu: ${menuName}\nReact to Choose a Role!\n`;
        let emojis = [];
        Object.keys(menus.guilds[guildId][menuName]).forEach(async role => {
            let emoji = menus.guilds[guildId][menuName][role]['emoji'];
            console.log(menus.guilds[guildId][menuName][role]);
            let desc = menus.guilds[guildId][menuName][role].desc;
            if(emoji == ""){
                await interaction.reply({content: "Sorry, not all roles have been assigned an emoji", ephemeral: true});
                return;
            }
            emojis.push(emoji);
            menuStr += `\n\t${role}: ${emoji}`;
            if(desc == ""){ menuStr += "\n"; }
            else{menuStr += `\n\t${desc}\n`}
        })

        channelId = channelId.replace("<#", "").replace(">", "");
        const channel = client.channels.cache.get(channelId);
        let message = await channel.send(menuStr);

        console.log(emojis);

        emojis.forEach(async emoji => { await message.react(emoji); })

		await interaction.reply({content: 'Successfully sent react menu.', ephemeral: true});
	},
};