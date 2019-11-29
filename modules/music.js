const ytdl = require('ytdl-core');
const discord = require('discord.js');

module.exports.play = playk;
async function playk (message, client, channel, args, id){
    console.log("Music Module Called");
    if(message.member.voiceChannel){
        let connection = await message.member.voiceChannel.join();
        let validurl = ytdl.validateURL(args[0]);
        let songinfo_addq = await ytdl.getInfo(args[0]);

        if(!validurl){
            message.channel.send(":no_entry_sign:  **Not Valid!**");
            return;
        }

        if(id.queue.server[`${message.guild.id}`] == undefined || id.queue.server[`${message.guild.id}`] == null){
            id.queue.server[`${message.guild.id}`] = {
                q: []
            }
        }

        id.queue.server[`${message.guild.id}`].q.push({
            link: args[0],
            request: msg.author.tag,
            connect: connection
        });

        console.log(id.queue);
        
        message.channel.send(`Added to Queue: ${songinfo_addq.title}`);

        qplay(message, client, channel, args, id);
    }
}

async function qplay(message, client, channel, args, id){
    if(!id.queue.server[`${message.guild.id}`].q.length < 1){
        let connects = id.queue.server[`${message.guild.id}`].q.connect;
        let info = await ytdl.getInfo(id.queue.server[`${message.guild.id}`].q[0]);
        let dispatcher = await connects.playStream(id.queue.server[`${message.guild.id}`].q[0]);

        message.react("👌");

        let playUI = new discord.RichEmbed();
            playUI.setAuthor("Now Playing")
                  .setColor("#c72525")
                  .setDescription(info.title)
                  .setThumbnail(songinfo.thumbnail_url)
                  .setTimestamp()
                  .setFooter("KBot");
        message.channel.send(playUI);

        dispatcher.once('finish',() => {
            if(id.queue.server[`${message.guild.id}`].q.length > 0){
                id.queue.server[`${message.guild.id}`].q.shift();
                qplay(message, client, channel, args, id);
            }
        });
    }
}

/* 
old codes

if(message.member.voiceChannel){
        let connection = await message.member.voiceChannel.join();
        let valid = await ytdl.validateURL(args[0]);
        if(!valid){
            message.channel.send(":no_entry_sign:  **Not Valid!**");
        } else {
            let songinfo = await ytdl.getInfo(args[0]);
            let dispatcher = await connection.playStream(ytdl(args[0], { filter: "audioonly" }));
            message.react("👌");

            let playUI = new discord.RichEmbed();
            playUI.setAuthor("Now Playing")
                  .setColor("#c72525")
                  .setDescription(songinfo.title)
                  .setThumbnail(songinfo.thumbnail_url)
                  .setTimestamp()
                  .setFooter("KBot");
            message.channel.send(playUI);
        }
    }
*/