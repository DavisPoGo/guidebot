
const { version } = require("discord.js");
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

  
  var everyone = message.guild.defaultRole.id;
  var cvMember = message.guild.roles.find("name", "CVMember");
  var cvmSilver = message.guild.roles.find("name", "CVM Silver");
  var cvmGold = message.guild.roles.find("name", "CVM Gold");


  const channelList = ["nests", "weather", "alert", "rare", "ultra", "100iv", "100iv_rare", "100iv_common", "candy", "event", "raid12", "raid34", "raid5"];
  const plusChannels = ["ultra", "100iv_rare", "100iv_common"];
  const areaName = args.join(" ");
  var chanName = "";
  
  if (args.join().length > 10) {
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
    name: areaName + "+",
    hoist: false,
    mentionable: false,
  }).then(function(role) {
    plusRole = role;
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
  await chan.overwritePermissions(plusRole, {VIEW_CHANNEL: true});
  if (plusChannels.includes(name)) {
    await chan.overwritePermissions(regRole, {VIEW_CHANNEL: false});
  }
  else {
    await chan.overwritePermissions(regRole, {VIEW_CHANNEL: true});
  }
  await chan.createWebhook(chan.name).then(hook => console.log(`"${name}": "${hook.id}/${hook.token}",`));
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