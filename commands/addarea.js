const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const paidTier = ["CVMember", "CVM Silver", "CVM Gold", "Cartographer", "CVMod", "Raid Coordinator"];
const areas = ["All", "Davis", "Dixon", "Fairfield", "Woodland", "Vacaville", "Winters", "North Natomas"];
const areaName = args.join(" ");
var inPaidServer = false;



if (!areas.map(item => item.toLowerCase()).includes(areaName.toLowerCase())) {
  message.reply('Invalid area name. Type `$arealist` for available areas');
  return
}

regRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase());

if(message.guild.roles.some(r=> r.name === regRole.name + "+")) {
  inPaidServer = true;
  plusRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "+");

}


mem = await message.guild.fetchMember(message.author);




if (inPaidServer) {
  if (mem.roles.some(r=>paidTier.includes(r.name)) ) {
    mem.addRole(plusRole).catch(console.error);
    mem.addRole(regRole).catch(console.error);
    message.reply(`you successfully added ${areaName}`);
  } else {
    mem.addRole(regRole).catch(console.error);
    message.reply(`you successfully added ${areaName} raid alerts. To sign up for pokemon alerts see <#532358270854234132>`);
  }
} else {
  mem.addRole(regRole).catch(console.error);
  message.reply(`you successfully added ${areaName}`);
}


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "addarea",
  category: "CVM Tools",
  description: "Subscribe to an area",
  usage: "$addarea <area_name>"
};
