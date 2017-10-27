const tools = require('./tools.js');
module.exports = {
    onMessage: function (){
        bot.on('message', function(message){
            tools.scrollToBottom("chat-log");
            
            var output
            var gotMessageSimple;
            var gotMessageDetailed;
            const commandEvoked = "User: [" + message.author.username + "] attemped to evoke command: " + message.content

            const li = document.createElement('li');
            var logged;
            li.className = "list-group-item message";

            if(message.channel.type == "dm"){
                if(message.author.id == message.channel.recipient.id){
                    const gotMessageDMSimple = "[{"+message.author.username+"} To {" + bot.user.username + "}]: "+message.content;
                    gotMessageSimple = gotMessageDMSimple;
                    const gotMessageDMDetailed = "[{"+message.author.username+"} To {" + bot.user.username + "|" + bot.user + "}]" + "-" + message.createdAt+" - "+message.author.username+" - "+": "+message.content;
                    gotMessageDetailed = gotMessageDMDetailed;
                }else{
                    const gotMessageDMSimple = "[{"+message.author.username+"} To {" + message.channel.recipient.username + "}]: "+message.content;
                    gotMessageSimple = gotMessageDMSimple;
                    const gotMessageDMDetailed = "[{"+message.author.username+"} To {" + message.channel.recipient.username + "|" + message.channel.recipient + "}]" + "-" + message.createdAt+" - "+message.author.username+" - "+": "+message.content;
                    gotMessageDetailed = gotMessageDMDetailed;
                }
            }else if(message.channel.type == "group"){
                const gotMessageGroupSimple = "[{"+message.author.username+"} To {" + message.channel.recipients + "}]: "+message.content;
                gotMessageSimple = gotMessageGroupSimple;
                //const gotMessageGroupDetailed = "[{"+message.author.username+"} To {" + message.channel.recipients + "|" + message.channel.recipients + "}]" + "-" + message.createdAt+" - "+message.author.username+" - "+": "+message.content;
                //gotMessageDetailed = gotMessageGroupDetailed;

            }else {
                const gotMessageGuildSimple = message.author.username+" - " + message.guild.name + "|" + message.channel + ": "+message.content;
                gotMessageSimple = gotMessageGuildSimple;
                const gotMessageGuilDDetailed = message.author+" - "+message.channel+" - "+message.createdAt+" - "+message.author.username+" - " + message.guild.name + "|" + message.channel + ": "+message.content;
                gotMessageDetailed = gotMessageGuilDDetailed;
            }

            if(detailedMode == true){
                output = gotMessageDetailed
            }else{
                output = gotMessageSimple
            }
            if(message.author.id == bot.user.id){
                li.style = "background-color:#b3b300; color:#990000";
                logged = document.createTextNode(output);
                if(message.channel.type == "dm"){
                    li.style = "background-color:#0059b3;";
                }
            }else{
                li.style = "background-color:black; vertical-align:bottom";
                logged = document.createTextNode(output);
                if(message.channel.type == "dm"){
                    li.style = "background-color:#0073e6;";
                }
                if(message.channel.type == "group"){
                    li.style = "background-color:#cc0066;";
                }
                if(detailedMode){
                    li.style = "background-color:#1a1a1a;";
                }
                if(message.content.toLowerCase().startsWith(prefix) && typeof prefix != "undefined"){
                    logged = document.createTextNode(commandEvoked);
                    li.style = "background-color:#004d00;";
                }
            }
            li.appendChild(logged);
            ul.appendChild(li);
        });
    },
    onDelete: function() {
        bot.on('messageDelete', function(message){
            const messageDeleted = "User: [" + message.author.username + "] deleted message: " + message.content
            tools.scrollToBottom("chat-log");
            const li = document.createElement('li');
            var logged;
            li.className = "list-group-item message";
            logged = document.createTextNode(messageDeleted);
            li.style = "background-color:#990000;";
            li.appendChild(logged);
            ul.appendChild(li);
        });
    },
    onUpdate: function() {
        bot.on('messageUpdate', function(oldMessage, newMessage){
            const messageUpdated = "User: [" + oldMessage.author.username + "] updated message: '" + oldMessage.content + "' => '" + newMessage.content + "'"
            tools.scrollToBottom("chat-log");
            const li = document.createElement('li');
            var logged;
            li.className = "list-group-item message";
            logged = document.createTextNode(messageUpdated);
            li.style = "background-color:#009900;";
            li.appendChild(logged);
            ul.appendChild(li);
        });
    },
    onReady: function(name){
        bot.on('ready', (name) => {
            tools.output(name+" Active", "log");
        });
    },
    monitor: function (name){
        monitorDiscord.onReady(name);
        monitorDiscord.onMessage();
        monitorDiscord.onDelete();
        monitorDiscord.onUpdate();
    }
};