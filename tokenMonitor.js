const Discord = require('discord.js');
const os = require("os");
const bot = new Discord.Client();
var token = '';

bot.on('ready', () => {
    console.log("Token Monitor Active"+os.EOL+"- - -");
});