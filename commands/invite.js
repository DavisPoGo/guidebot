const { version } = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars


const msg = message.reply(`CVM invite: https://discord.gg/twzNj4G`);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "CVM Tools",
  description: "Gives CVM invite links",
  usage: "invite"
};