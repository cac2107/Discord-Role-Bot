const { SlashCommandBuilder } = require('discord.js');
const groups = require("../data/groups.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listgroups')
		.setDescription('Lists all created role groups for this guild.'),
	async execute(interaction) {
        const guildId = interaction.guild.id;

        if(groups.guilds[guildId] == undefined){
            await interaction.reply({content: "Sorry, you have not created any groups yet!", ephemeral: true});
            return;
        }

        let groupEmbed = {title: "Groups", fields: []};

        Object.keys(groups.guilds[guildId]).forEach(group => {
            field = {name: `${group}`, value: ""}

            let first = true;
            fieldValue = ""
            groups.guilds[guildId][group].forEach(role => {
                if(first){ first = false; }
                else{ fieldValue += "  "; }

                fieldValue += role;
            })
            field.value = fieldValue;
            groupEmbed.fields.push(field);
        })

        await interaction.reply({embeds: [groupEmbed], ephemeral: true});
	},
};