const fs = require('fs');

let groups = {"guilds": {}};
let menus = {"guilds": {}};

fs.writeFileSync('./data/groups.json', JSON.stringify(groups, null, 2), (err) => { console.log(err); });
fs.writeFileSync('./data/menus.json', JSON.stringify(menus, null, 2), (err) => { console.log(err); });
