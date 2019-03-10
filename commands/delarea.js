const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const paidTier = ["CVMember", "CVM Silver", "CVM Gold", "Cartographer", "CVMod", "Raid Coordinator"];
const areas = ["All", "Davis", "Dixon", "Fairfield", "Woodland", "Vacaville", "Winters", "North Natomas"];
const areaName = args.join(" ");
var inPaidServer = false;

mem = await message.guild.fetchMember(message.author);

if (!areas.map(item => item.toLowerCase()).includes(areaName.toLowerCase())) {
  message.reply('Invalid area name. Type `$arealist` for available areas');
  return
}

regRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase());

if(message.guild.roles.some(r=> r.name === regRole.name + "+")) {
  inPaidServer = true;
  plusRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "+");

}



if (mem.roles.has(regRole.id) ) {
  if (inPaidServer) {
    if (mem.roles.some(r=>paidTier.includes(r.name)) ) {
      mem.removeRole(plusRole).catch(console.error);
      mem.removeRole(regRole).catch(console.error);
      message.reply(`you successfully removed ${areaName}`);
    } else {
      mem.removeRole(regRole).catch(console.error);
      message.reply(`you successfully removed ${areaName} raid alerts`);
    }
  } else {
    mem.removeRole(regRole).catch(console.error);
    message.reply(`you successfully removed ${areaName}`);
  }
} else {
  message.reply('You are not currently subscribed to this area');
}






};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "delarea",
  category: "CVM Tools",
  description: "Unsubscribes from an area",
  usage: "delareat"
};