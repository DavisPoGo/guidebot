const { version } = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
console.log(args[0]);
message.guild.channels.filterArray(c => c.name.includes(args[0])).map(chan => chan.setName(args[1]));

//.map(cat => message.guild.createChannel(args[0],'text',{parent: `${cat.id}`}));
//console.log(result);

// var channelList = ['nests', 'alerts', ]
// var prom = message.guild.createChannel(args[0],'category');
//   prom.then(cat => message.guild.createChannel(`Alerts_${cat.name}`,'text',{parent: `${cat.id}`}));
//   prom.then(cat => message.guild.createChannel(`100IV_${cat.name}`,'text',{parent: `${cat.id}`}));
//   prom.catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "renchan",
  category: "Server Tools",
  description: "Renames a channel <renchan oldChan newChan>",
  usage: "renchan"
};
