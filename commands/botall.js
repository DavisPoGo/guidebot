const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars



CVMHelperRole = await message.guild.roles.find(r=>r.name.toLowerCase() == "cvm helper");
message.guild.channels.map(async chan => setChanPerm(CVMHelperRole,chan));


async function setChanPerm (role,chan) {
  await chan.overwritePermissions(role, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
}


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "botall",
  category: "Server Tools",
  description: "Allows CVM Helper to see all channels",
  usage: "botall"
};
