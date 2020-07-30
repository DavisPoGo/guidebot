const { version } = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
var everyone = message.guild.defaultRole.id;
var goldChanList = ["100iv","90iv","event","pokemon"];
var silverChanList = [];
var bronzeChanList = ["raid12", "raid34", "raid5", "lures"];
const area = args.join(" ");

message.guild.channels.filter(c => c.type === 'category' && c.name === '.' + area).map(cat => cat.children.map(chan => updateChanPerm(cat,chan,message)));


async function updateChanPerm (cat,chan,message) {
  
  areaName = cat.name.charAt(1).toUpperCase() + cat.name.slice(2);
  bronzeRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "-bronze");
  silverRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "-silver");
  goldRole = await message.guild.roles.find(r=>r.name.toLowerCase() == areaName.toLowerCase() + "-gold");
  chanName = chan.name.slice(chan.name.lastIndexOf("_")+1);
  chan.overwritePermissions(everyone, {VIEW_CHANNEL: false});

  console.log(`${areaName} | ${chanName}`);

  if(goldChanList.includes(chanName)) {
    chan.overwritePermissions(goldRole, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
  } else if (silverChanList.includes(chanName)){
    chan.overwritePermissions(goldRole, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
    chan.overwritePermissions(silverRole, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
  } else if (bronzeChanList.includes(chanName)){
    chan.overwritePermissions(goldRole, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
    chan.overwritePermissions(silverRole, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
    chan.overwritePermissions(bronzeRole, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
  } else {
    chan.overwritePermissions(goldRole, {SEND_MESSAGES: true,VIEW_CHANNEL: true});
    chan.overwritePermissions(silverRole, {SEND_MESSAGES: true,VIEW_CHANNEL: true});
    chan.overwritePermissions(bronzeRole, {SEND_MESSAGES: true,VIEW_CHANNEL: true});
  }
}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "autochansetup",
  category: "Server Tools",
  description: "Changes permissions for auto-role bot",
  usage: "autochansetup"
};