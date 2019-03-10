const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

// console.log(`${message.guild.channels.get(args[0]).children}`)
if(!message.guild.channels.find("name",args.join(" "))){
 	message.reply('Invalid area name.');
	return
}
message.guild.channels.find("name",args.join(" ")).children.map(async chan => await delChan(chan));

// message.guild.channels.find("name",args[0]).delete();

if (!message.guild.roles.find("name",args.join(" ").substring(1))) {
	message.reply('Invalid role name.');
	return
}
message.guild.roles.find("name",args.join(" ").substring(1)).delete();



await new Promise((resolve, reject) => setTimeout(resolve, 3000));
await delChan(message.guild.channels.find("name",args.join(" ")));
//await delRole(message.guild.roles.find("name",args[0].substring(1)));

// message.guild.channels.filterArray(c => c.name != "bot_commands").map(async chan => delChan(chan));


async function delChan (chan) {
  if (!chan.name.startsWith("bot_commands")) {
	  await chan.delete()
	  	.then('channel deleted')
	  	.catch(console.error);
  }
};
async function delRole (role) {
  if (!role.name.startsWith("Bot") && !role.name.startsWith("everyone")) {
	  await role.delete()
	  	.then('role deleted')
	  	.catch(console.error);
  }
};

// message.guild.channels.filter(chan => chan.parentID ).filter(ch => ch.parentID.includes(args[0])).map(async c => await c.delete);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "deletecat",
  category: "Server Tools",
  description: "Delete a category",
  usage: "deletecat"
};