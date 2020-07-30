const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const premierTier = ["CVMod", "EqDonor", "Cartographer", "CVMod", "Raid Coordinator"];
const areas = ["All", "Davis", "Dixon", "Fairfield", "Woodland", "Vacaville", "Winters", "North Natomas","Sacramento","Elk Grove"];
const areaName = args.join(" ");
var inPaidServer = true;
var roleLevel = "";



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


mem = await message.guild.fetchMember(message.author);


if (mem.roles.some(r=>r.name.includes("|"))) {
  roleLevel = mem.roles.find(r=>r.name.includes("|")).name.split("|")[0].split("-")[1].toLowerCase();
} else if (mem.roles.some(r=>premierTier.includes(r.name))) {
  roleLevel = "gold";
}

if (inPaidServer) {
  if (roleLevel) {
    matchedRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "-" + roleLevel);
    mem.addRole(matchedRole).catch(console.error);
    mem.addRole(regRole).catch(console.error);
    message.reply(`you successfully added ${areaName} (${roleLevel} Level)`);
  } else {
    mem.addRole(regRole).catch(console.error);
    message.reply(`Chat access added. Contribute to gain access to CVM scans`);
  }
}

// if (inPaidServer) {
//   if (mem.roles.some(r=>r.name.indexOf("CVM-Gold")==0) || mem.roles.some(r=>premierTier.includes(r.name))) {
//     mem.addRole(goldRole).catch(console.error);
//     mem.addRole(regRole).catch(console.error);
//     message.reply(`you successfully added ${areaName} (Gold Level)`);
//   } else if (mem.roles.some(r=>r.name.indexOf("CVM-Silver")==0) ) {
//     mem.addRole(silverRole).catch(console.error);
//     mem.addRole(regRole).catch(console.error);
//     message.reply(`you successfully added ${areaName} (Silver Level)`);
//   } else if (mem.roles.some(r=>r.name.indexOf("CVM-Bronze")==0) ) {
//     mem.addRole(bronzeRole).catch(console.error);
//     mem.addRole(regRole).catch(console.error);
//     message.reply(`you successfully added ${areaName} (Bronze Level)`);
//   } else {
//     message.reply(`Contribute to gain access to CVM`);
//   }
// }
  



// if (inPaidServer) {
//   if (mem.roles.some(r=>paidTier.includes(r.name)) ) {
//     mem.addRole(plusRole).catch(console.error);
//     mem.addRole(regRole).catch(console.error);
//     message.reply(`you successfully added ${areaName}`);
//   } else {
//     mem.addRole(regRole).catch(console.error);
//     message.reply(`you successfully added ${areaName} raid alerts. To sign up for pokemon alerts see <#532358270854234132>`);
//   }
// } else {
//   mem.addRole(regRole).catch(console.error);
//   message.reply(`you successfully added ${areaName}`);
// }


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
