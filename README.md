# Discord-Role-Bot

## Features

- Create react menus for Discord Roles.
- Messages specified admin channel when a user chooses a role.
- Saves previously created menus so it can be sent multiple times.

## Setup
1. Fork and clone repository.
2. Run the commands: 
```
npm init
npm install
```
3. Create file ".env" in the main directory.
4. Add ```TOKEN='enter token here'``` and ```CLIENT_ID='Enter id of the bot here'``` to .env
5. Run the command ```node ./index.js```

## How to use
1. Create a group of roles by using ```/groupcreate 'group name'```
2. Add roles to the group by using ```/groupadd 'group name' '@Role'```
3. Create a role menu by using ```/rolemenucreate 'menu name' 'groupname'```
4. React to the messages sent by the bot to define the emojis to be used.
5. Specify admin channel for reaction notifications by using ```/setadminchannel '#admin-channel'```
6. (OPTIONAL) Add a description to a role in a menu by using ```/rolemenudescription 'menu name' '@Role' 'description'```
7. Send role menu to specified channel by using ```/sendreactmenu 'menu name' '#channel'```
8. All set!

## Notes
Use ```/listmenus``` to view menus that you have made.
Use ```/listgroups``` to view groups that you have made.

## To Do
1. Convert to SQL instead of JSON
2. Refactor to typescript
