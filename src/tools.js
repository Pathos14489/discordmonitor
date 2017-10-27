module.exports = {
    output: function(argument, type){ 
    tools.scrollToBottom("chat-log");
    
    const li = document.createElement('li');
    li.className = "list-group-item message";
    message = document.createTextNode(argument);
    const image = document.createElement('img');
    image.style="width:50px;height:50px;"

    if(type == "error"){
        li.style = "background-color:#550000;";
        image.src="./../../assets/imgs/WARNING.png"
    }else if(type == "log"){
        li.style = "background-color:#808080;";
    }else if(typeof type != "string"){
        type = "log"
        li.style = "background-color:#808080;";
    }else{
        li.style = "background-color:#550000;";
        image.src="./../../assets/imgs/WARNING.png"
        message = document.createTextNode("ERROR: OUTPUT TYPE: "+ type +"IS NOT VALID!");
    }
    
    if(type == "error"){
        li.appendChild(image)
    }
    li.appendChild(message);
    ul.appendChild(li);
    },
    sleep: function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    },
    scrollToBottom: function (id) {
        var div = document.getElementById(id);
        div.scrollTop = div.scrollHeight - div.clientHeight;
    },
    scrollToTop: function (id) {
        var div = document.getElementById(id);
        div.scrollTop = 0;
    },
    //Require jQuery
    scrollSmoothToBottom: function (id) {
        var div = document.getElementById(id);
        $('#' + id).animate({
            scrollTop: div.scrollHeight - div.clientHeight
        }, 500);
    },
    //Require jQuery
    scrollSmoothToTop: function (id) {
        var div = document.getElementById(id);
        $('#' + id).animate({
            scrollTop: 0
        }, 500);
    },
    createBot: function (token){
        document.getElementById("loaded").textContent = "const Discord = require('discord.js');const bot = new Discord.Client();"
        tools.output("Creating bot...", "log")
        bot.login(token)   
            .then(function(){
                tools.output("Token Monitor Active — Bot logged in!", "log")
                document.getElementById("name").textContent = bot.user.username
                monitorDiscord.monitor("Token Monitor")
            });
    },
};