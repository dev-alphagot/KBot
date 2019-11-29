// Copyright by (C) 2019 Minecart8925(Hangdongyee, Maka)
const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');
const raw_config = fs.readFileSync(__dirname + "/config.json", "utf-8");
const config = JSON.parse(raw_config);
const ytdl = require('ytdl-core');
const prefix = config.prefix;
const os = require('os');
const day=new Date
const id = {
    queue: [],
    config: config
};

client.on("ready",() => {
    console.log("Bot Ready.");
    client.user.setPresence({
        game: {
            name: `type ${prefix}help`,
            type: "STREAMING"
        },
        
    });
});

client.on("message", async message => {
    let msg = message;
    let args;
    let cmd;
    

    if(msg.author.bot == true){
        return; //ignore Bot
    } else if(!msg.content.startsWith(prefix)){
        return; //ignore not-command message
    } else {
        //cut commands
        args = msg.content.split(" ");
        cmd = args[0];
        args.shift();
        cmd = cmd.substr(prefix.length);
    }
    //log message
    console.log("cmd: " + cmd);
    fs.appendFileSync("\Logs\Chat_${msg.guild}\Channel_${msg.channel}","${day.getUTCDate}> ${msg.content}")
    console.log(args);
    if(cmd == "play"){
        let playmodule = require("./modules/music.js");
        playmodule.play(msg, client, msg.channel, args, id);
    } else if(cmd == "leave"){
    if(!message.member.voiceChannel){
        message.channel.send(":no_entry_sign:  **You are not on the voice channel!**");
        return;
    }
    if(!message.guild.me.voiceChannel){
        message.channel.send(":no_entry_sign:  **The bot is not connected to the music channel!**");
        return;
    }
    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID){
        message.channel.send(":no_entry_sign:  **You are not connected to the same music channel!**");
        return;
    }

    message.guild.me.voiceChannel.leave();
    message.react("👋");
    } else if(cmd == "ping"){
       let pingmodule = require('./modules/ping.js');
       pingmodule.ping(message, client, msg.channel, args, id);
    } else if(cmd == "reload"){
        let reloadmodule = require('./modules/reload.js');
        reloadmodule.ping(message, client, msg.channel, args, id);
    }
    
});



client.login(config.token);