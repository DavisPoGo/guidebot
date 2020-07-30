const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

var everyone = message.guild.defaultRole.id;
var goldChanList = ["100iv","90iv","event","pokemon"];
var silverChanList = [];
var bronzeChanList = ["raid12", "raid34", "raid5", "lures"];
var bronzeRole
var silverRole
var goldRole

message.guild.channels.filter(c => c.type === 'category' && c.name.charAt(0) === '.').map(async cat => setAreaPerm(message,cat));

async function setAreaPerm (message,cat) {
  areaName = cat.name.charAt(1).toUpperCase() + cat.name.slice(2);
  console.log(`"${areaName}"`);
  
  message.guild.createRole({ 
    name: areaName + "-Bronze",
    hoist: false,
    mentionable: false,
  }).then(function(role) {
    bronzeRole = role;
    console.log(`"Role ${bronzeRole.name} created"`);
  });


  message.guild.createRole({ 
    name: areaName + "-Silver",
    hoist: false,
    mentionable: false,
  }).then(function(role) {
    silverRole = role;
    console.log(`"Role ${silverRole.name} created"`);
  });

  message.guild.createRole({ 
    name: areaName + "-Gold",
    hoist: false,
    mentionable: false,
  }).then(function(role) {
    goldRole = role;
    console.log(`"Role ${goldRole.name} created"`);
  });

  // cat.children.map(chan => updateChanPerm(chan,bronzeRole,silverRole,goldRole));

}


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "autorolesetup",
  category: "Server Tools",
  description: "Changes permissions for auto-role bot",
  usage: "autorolesetup"
};
