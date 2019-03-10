const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

message.reply(`members: ${message.guild.memberCount}`);



};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "memcount",
  category: "CVM Tools",
  description: "Subscribe to an area",
  usage: "$addarea <area_name>"
};
