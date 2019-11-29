const discord = require('discord.js');

module.exports.ping = ping;
async function ping(message, client, channel, args, id){
    let pingUI = new discord.RichEmbed();
    pingUI.setAuthor("Ping")
          //.setColor("#cc800c5")
          .setDescription(`Current Ping: ${client.ping}ms`)
          .setTimestamp()
          .setFooter("KBot");
    message.channel.send(pingUI);
}