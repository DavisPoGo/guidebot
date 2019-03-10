const { version } = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars




const role = message.guild.roles.find(r=>args.slice(0).join(" ").includes(r.name));

message.guild.members.forEach(member => member.addRole(role));



};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "assignall",
  category: "Server Tools",
  description: "Assign role to everyone",
  usage: "assignall"
};