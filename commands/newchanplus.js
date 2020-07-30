const { version } = require("discord.js");
const fs = require('fs');

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

var everyone = message.guild.defaultRole.id;
var newChannels = [];
message.guild.channels.filterArray(c => c.type === 'category' && c.name.charAt(0) === '.').map(cat => message.guild.createChannel(cat.name.substring(1) + '_' + args[0],'text').then(async chan => setChanPerm(message,chan, cat,newChannels)));




async function setChanPerm (message,chan, cat,newChannels) {
  await chan.overwritePermissions(everyone, {VIEW_CHANNEL: false});
  await chan.overwritePermissions(message.guild.roles.find(r=>r.name.toLowerCase() == cat.name.substring(1).toLowerCase() + '-gold'), {SEND_MESSAGES: false,VIEW_CHANNEL: true});
  await chan.setParent(cat);
  await chan.createWebhook(chan.name).then(hook=>newChannels.push({name:chan.name, alerts:"default.json", filters:chan.name.split(cat.name.substring(1).toLowerCase() + '_')[1] + '.json', geofence:cat.name.substring(1).toLowerCase().replace(/ /g,"_") + '.txt', webhook:'https://discord.com/api/webhooks/' + hook.id + '/' + hook.token}));
  fs.writeFile('/home/cvm/test.json', JSON.stringify(newChannels, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  }); 
 }


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "newchanplus",
  category: "Server Tools",
  description: "Creates a new plus channel for each area",
  usage: "newchan <channel name>"
};
