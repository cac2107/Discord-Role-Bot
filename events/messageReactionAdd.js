const menus = require("../data/menus.json");
const fs = require('fs');

module.exports = async(und, reaction) => {
    if(reaction.partial){
        try{ await reaction.fetch(); } catch (error) { 
            console.error("Error: ", error);
        }
    }

    if(!(reaction.message.author.id === client.user.id)){ return; }

    if(reaction.message.content.startsWith("menucreate")){
        const guildId = reaction.message.guild.id;
        let emoji = reaction.emoji.name;
        let message = reaction.message.content;
        let messageParts = message.split(":");
        const menuName = messageParts[0].split(" ")[1];
        const role = messageParts[1].trim();

        if(emoji.length > 2){
            let strippedEmoji = reaction.emoji.replace(":", "");
            emoji = reaction.message.guild.emojis.cache.find(em => em.name === strippedEmoji);
        }

        menus.guilds.forEach(guild => {
            if(Object.keys(guild)[0] == guildId){
                guild[guildId].forEach(menu => {
                    if(Object.keys(menu)[0] == menuName){
                        menu[menuName][role] = emoji;
                    }
                })
            }
        })

        fs.writeFileSync("./data/menus.json", JSON.stringify(menus, null, 2));
    }
}
