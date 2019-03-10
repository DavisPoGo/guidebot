const { version } = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

message.guild.channels.map(async chan => await delChan(chan));
message.guild.roles.map(async role => await delRole(role));
// message.guild.channels.filterArray(c => c.name != "bot_commands").map(async chan => delChan(chan));


async function delChan (chan) {
  if (!chan.name.startsWith("bot_commands")) {
	  await chan.delete()
	  	.then('channel deleted')
	  	.catch(console.error);
  }
};
async function delRole (role) {
  if (!role.name.startsWith("Bot") && !role.name.startsWith("@everyone")) {
	  await role.delete()
	  	.then('role deleted')
	  	.catch(console.error);
  }
};

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "nuke",
  category: "Server Tools",
  description: "Deletes all channels and roles",
  usage: "nuke"
};