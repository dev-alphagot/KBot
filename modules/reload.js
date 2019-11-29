const discord = require('discord.js');

module.exports.ping = ping;
async function ping(message, client, channel, args, id){
    if(!id.config.ownerid == message.author.id) {
        message.channel.send("**:no_entry_sign:  You are not owner!**");
    }
        
    try {
        if(args[0] == "server"){
            delete require.cache[require.resolve(`./server.js`)];
        } else {
            delete require.cache[require.resolve(`./modules/${args[0]}.js`)];
        }
    } catch (e){
        message.channel.send(`**reload fail. \n ===ERR LOG===\n**${e}`);
    }
}