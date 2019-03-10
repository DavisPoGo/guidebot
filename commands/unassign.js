const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars


const user = message.mentions.users.first();
const roleFlag = message.guild.roles.some(r=>args.slice(0).join(" ").includes(r.name));
console.log(`${user}, ${roleFlag}`);
if (!user || !roleFlag) return message.reply('Must specify a user and role!');
const role = message.guild.roles.find(r=>args.slice(0).join(" ").includes(r.name));

const mem = await message.guild.fetchMember(user);

if (mem.roles.has(role.id)) {
  	mem.removeRole(role);
  	message.reply(`${mem.displayName} removed from role ${role.name}`);
} else {
  message.reply(`${mem.displayName} doesn't have role ${role.name}`);
}



};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "unassign",
  category: "Server Tools",
  description: "Assign roles",
  usage: "unassign"
};