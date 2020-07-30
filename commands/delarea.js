const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const premierTier = ["CVMod", "EqDonor", "Cartographer", "CVMod", "Raid Coordinator"];
const areas = ["All", "Davis", "Dixon", "Fairfield", "Woodland", "Vacaville", "Winters", "North Natomas", "Sacramento", "Elk Grove"];
const areaName = args.join(" ");
var inPaidServer = true;
let roleLevel = "";

mem = await message.guild.fetchMember(message.author);

if (!areas.map(item => item.toLowerCase()).includes(areaName.toLowerCase())) {
  message.reply('Invalid area name. Type `$arealist` for available areas');
  return
}

regRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase());
// bronzeRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "-bronze");
// silverRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "-silver");
// goldRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "-gold");


// if(message.guild.roles.some(r=> r.name === regRole.name + "+")) {
//   inPaidServer = true;
//   plusRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "+");

// }

if (mem.roles.some(r=>r.name.includes("|"))) {
  roleLevel = mem.roles.find(r=>r.name.includes("|")).name.split("|")[0].split("-")[1].toLowerCase();
} else if (mem.roles.some(r=>premierTier.includes(r.name))) {
  roleLevel = "gold";
}

if (inPaidServer) {
  if (roleLevel) {
    matchedRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "-" + roleLevel);
    mem.removeRole(matchedRole).catch(console.error);
    mem.removeRole(regRole).catch(console.error);
    message.reply(`you successfully removed ${areaName} (${roleLevel} Level)`);
  } else {
    mem.removeRole(regRole).catch(console.error);
    message.reply(`you successfully removed ${areaName}`);
  }
}

// if (inPaidServer) {
//   if (mem.roles.has(regRole.id) ) {
//     if (mem.roles.some(r=>r.name.indexOf("CVM-Gold")==0) ) {
//       mem.removeRole(goldRole).catch(console.error);
//       mem.removeRole(regRole).catch(console.error);
//       message.reply(`you successfully removed ${areaName} (Gold Level)`);
//     } else if (mem.roles.some(r=>r.name.indexOf("CVM-Silver")==0) ) {
//       mem.removeRole(silverRole).catch(console.error);
//       mem.removeRole(regRole).catch(console.error);
//       message.reply(`you successfully removed ${areaName} (Silver Level)`);
//     } else if (mem.roles.some(r=>r.name.indexOf("CVM-Bronze")==0) ) {
//       mem.removeRole(bronzeRole).catch(console.error);
//       mem.removeRole(regRole).catch(console.error);
//       message.reply(`you successfully removed ${areaName} (Bronze Level)`);
//     }
//   }
// }


// if (mem.roles.has(regRole.id) ) {
//   if (inPaidServer) {
//     if (mem.roles.some(r=>paidTier.includes(r.name)) ) {
//       mem.removeRole(plusRole).catch(console.error);
//       mem.removeRole(regRole).catch(console.error);
//       message.reply(`you successfully removed ${areaName}`);
//     } else {
//       mem.removeRole(regRole).catch(console.error);
//       message.reply(`you successfully removed ${areaName} raid alerts`);
//     }
//   } else {
//     mem.removeRole(regRole).catch(console.error);
//     message.reply(`you successfully removed ${areaName}`);
//   }
// } else {
//   message.reply('You are not currently subscribed to this area');
// }






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