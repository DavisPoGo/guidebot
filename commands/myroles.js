const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

mem = await message.guild.fetchMember(message.author);

roleList = [];
mem.roles.filter(r=> r.name !== '@everyone').map(r=>roleList.push(`${r.name}`));
message.reply(`Your roles are ${roleList.join(", ")}`);



};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "myroles",
  category: "CVM Tools",
  description: "Check CVM roles",
  usage: "$myroles"
};
