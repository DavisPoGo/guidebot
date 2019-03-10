const { version } = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

var everyone = message.guild.defaultRole.id;
message.guild.channels.filterArray(c => c.type === 'category' && c.name.charAt(0) === '.').map(cat => message.guild.createChannel(cat.name.substring(1) + '_' + args[0],'text').then(async chan => setChanPerm(chan, cat)));


async function setChanPerm (chan, cat) {
  regRole = await message.guild.roles.find(r=>r.name.toLowerCase() == cat.name.substring(1).toLowerCase());
  await chan.overwritePermissions(regRole, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
  await chan.overwritePermissions(everyone, {VIEW_CHANNEL: false});
  await chan.setParent(cat);
  await chan.createWebhook(chan.name).then(hook => console.log(`${cat.name.substring(1)} \n "${args[0]}": "${hook.id}/${hook.token}",`));
}


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "newchan",
  category: "Server Tools",
  description: "Creates a new channel for each area",
  usage: "newchan <channel name>"
};
