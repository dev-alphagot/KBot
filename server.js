// Copyright by (C) 2019 Minecart8925(Hangdongyee, Maka)
const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');
const raw_config = fs.readFileSync(__dirname + "/config.json", "utf-8");
const config = JSON.parse(raw_config);
const ytdl = require('ytdl-core');

client.on("ready",() => {
    console.log("Bot Ready.");
    client.user.setPresence({
        game: {
            name: "type ;help / ;help를 입력해보세요!",
            type: "STREAMING"
        },
        status: "idle"
    });
});

client.on("message", async message => {
    let msg = message;
    let args;
    let cmd;

    if(msg.author.bot == true){
        return; //ignore Bot
    } else if(!msg.content.startsWith(";")){
        return; //ignore not-command message
    } else {
        //cut commands
        args = msg.content.split(" ");
        cmd = args[0];
        args.shift();
        cmd = cmd.substr(1);
    }
    //log message
    console.log("cmd: " + cmd);
    console.log(args);
    if(cmd == "play"){
        if(message.member.voiceChannel){
            let connection = await message.member.voiceChannel.join();
            let valid = await ytdl.validateURL(args[0]);
            if(!valid){
                message.channel.send(":no_entry_sign:  **Not Valid!**\n**올바르지 않습니다!**");
            } else {
                let songinfo = await ytdl.getInfo(args[0]);
                let dispatcher = await connection.playStream(ytdl(args[0], { filter: "audioonly" }));
                message.react("👌");

                let playUI = new discord.RichEmbed();
                playUI.setAuthor("Now Playing / 현재 재생중")
                      .setColor("#c72525")
                      .setDescription(songinfo.title)
                      .setThumbnail(songinfo.thumbnail_url)
                      .setTimestamp()
                      .setFooter("KBot Music Player / KBot 음악 재생기");
                message.channel.send(playUI);
            }
        }
    } else if(cmd == "leave"){
    if(!message.member.voiceChannel){
        message.channel.send(".\n**You are not on the voice channel!**\n**당신은 음성 채널에 연결하지 않았습니다!**");
        return;
    }
    if(!message.guild.me.voiceChannel){
        message.channel.send(".\n**The bot is not connected to the music channel!**\n**봇이 음성 채널에 연결되지 않았습니다!**");
        return;
    }
    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID){
        message.channel.send(".\n**You are not connected to the same music channel!**\n**당신은 봇과 같은 음성 채널에 연결되지 않았습니다!**");
        return;
    }

    message.guild.me.voiceChannel.leave();
    message.react("👋");
    } else if(cmd == "eval"){
        try {
            var result1 = eval(args[0]);
        } catch(e) {
            message.channel.send(`.\n**EVAL ERROR**\n**이발 오류**\n\n${e}`);
        }
        let evalUI = new discord.RichEmbed();
            evalUI.setAuthor("Eval Results / 이발 결과: ")
                  .setColor("#49b051")
                  .setDescription(`${result1}`)
                  .setTimestamp()
                  .setFooter("KBot Eval");
        message.channel.send(evalUI);
    }

});

client.login(config.token);