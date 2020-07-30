
const { version } = require("discord.js");
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

  
  var everyone = message.guild.defaultRole.id;
  var cvMember = message.guild.roles.find("name", "CVMember");
  var cvmSilver = message.guild.roles.find("name", "CVM Silver");
  var cvmGold = message.guild.roles.find("name", "CVM Gold");

  const bronzeChannels = ["raid12", "raid34", "raid5", "lures"];
  const silverChannels = [];
  const goldChannels = ["rare", "100iv", "90iv", "event"];
  const channelList = ["chat", "raid", "ex_raid", "raid12", "raid34", "raid5", "lures", "rare", "100iv", "90iv", "event"];


  const areaName = args.join(" ");
  var chanName = "";
  
  if (args.join().length > 13) {
    if (args.length > 1) {
      args.forEach(element => chanName+=element.slice(0,1).toLowerCase());
    }
    else {
      chanName = args[0].slice(0,3);
    }
  }
  else {
    console.log('ok to use');
    chanName = args.join("_").toLowerCase();
  }
    

  message.guild.createRole({ 
    name: areaName + "-Gold",
    hoist: false,
    mentionable: false,
  }).then(function(role) {
    goldRole = role;
  });

  message.guild.createRole({ 
    name: areaName + "-Silver",
    hoist: false,
    mentionable: false,
  }).then(function(role) {
    silverRole = role;
  });

  message.guild.createRole({ 
    name: areaName + "-Bronze",
    hoist: false,
    mentionable: false,
  }).then(function(role) {
    bronzeRole = role;
  });

  message.guild.createRole({ 
    name: areaName,
    hoist: true,
    mentionable: true,
  }).then(function(role) {
    regRole = role;
  });

 
  message.guild.createChannel("." + areaName,'category').then(cat => makeChannel(channelList,cat));


async function makeChannel (channelList,cat) {
  const pArray = channelList.map(async name => {
    message.guild.createChannel(chanName + "_" + name,'text').then(async chan => setChanPerm(chan,cat,name));
  });
}

async function setChanPerm (chan, cat, name) {
  await chan.setParent(cat);
  await chan.overwritePermissions(everyone, {VIEW_CHANNEL: false});


  
  if (bronzeChannels.includes(name)) {
    await chan.overwritePermissions(bronzeRole, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
    await chan.overwritePermissions(silverRole, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
    await chan.overwritePermissions(goldRole, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
    await chan.overwritePermissions(regRole, {VIEW_CHANNEL: false});
    await chan.createWebhook(chan.name).then(hook => console.log(`"${name}": "${hook.id}/${hook.token}",`));
  } else if (silverChannels.includes(name)) {
    await chan.overwritePermissions(bronzeRole, {VIEW_CHANNEL: false, SEND_MESSAGES: false});
    await chan.overwritePermissions(silverRole, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
    await chan.overwritePermissions(goldRole, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
    await chan.overwritePermissions(regRole, {VIEW_CHANNEL: false});
    await chan.createWebhook(chan.name).then(hook => console.log(`"${name}": "${hook.id}/${hook.token}",`));
  } else if (goldChannels.includes(name)) {
    await chan.overwritePermissions(bronzeRole, {VIEW_CHANNEL: false, SEND_MESSAGES: false});
    await chan.overwritePermissions(silverRole, {VIEW_CHANNEL: false, SEND_MESSAGES: false});
    await chan.overwritePermissions(goldRole, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
    await chan.overwritePermissions(regRole, {VIEW_CHANNEL: false});
    await chan.createWebhook(chan.name).then(hook => console.log(`"${name}": "${hook.id}/${hook.token}",`));
  } else
    await chan.overwritePermissions(bronzeRole, {VIEW_CHANNEL: true, SEND_MESSAGES: true});
    await chan.overwritePermissions(silverRole, {VIEW_CHANNEL: true, SEND_MESSAGES: true});
    await chan.overwritePermissions(goldRole, {VIEW_CHANNEL: true, SEND_MESSAGES: true});
    await chan.overwritePermissions(regRole, {VIEW_CHANNEL: true, SEND_MESSAGES: true});
  }


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "newarea",
  category: "Server tools",
  description: "Creates all rooms, sets permissions, generates webhooks for new area",
  usage: "newarea"
};