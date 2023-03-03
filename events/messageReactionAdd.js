const menus = require("../data/menus.json");
const fs = require('fs');

module.exports = async(und, reaction, user) => {
    if(reaction.partial){ try{ await reaction.fetch(); } catch (error) { console.error("Error: ", error); }}

    if(!(reaction.message.author.id === client.user.id) || user.id == client.user.id){ return; }

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

        menus.guilds[guildId][menuName][role].emoji = emoji;

        fs.writeFileSync("./data/menus.json", JSON.stringify(menus, null, 2));
        
    } else if(reaction.message.content.split("\n")[0].split(":")[0] == "Role Menu"){
        const guildId = reaction.message.guild.id;
        let adminChannel = client.channels.cache.get(menus.guilds[guildId]["admin-channel"]);
        let emoji = reaction.emoji.name;
        if(emoji.length > 2){
            let emojiStripped = reaction.emoji.replace(":", "");
            emoji = reaction.message.guild.emojis.cache.find(em => em.name === emojiStripped);
        }

        let menuName = reaction.message.content.split("\n")[0].split(":")[1].trim();
        let menu = menus.guilds[guildId][menuName];
        let chosenRole = "";
        Object.keys(menu).forEach(role => {
            if(menu[role].emoji == emoji){ chosenRole = role; }
        })

        await adminChannel.send(`<@${user.id}> chose ${emoji} for the role ${chosenRole}`);
    }
}
