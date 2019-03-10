
const { version } = require("discord.js");
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

  
  var everyone = message.guild.defaultRole.id;


  const alertChannels = ["raid12", "raid34", "raid5", "pokemon", "100iv", "90iv", "event"];
  const channelList = ["chat", "raid", "ex_raid", "raid12", "raid34", "raid5", "pokemon", "100iv", "90iv", "event"];

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
  await chan.overwritePermissions(regRole, {VIEW_CHANNEL: true});
  if (alertChannels.map(item => item.toLowerCase()).includes(name.toLowerCase())) {
    await chan.overwritePermissions(regRole, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
    await chan.createWebhook(chan.name).then(hook => console.log(`"${name}": "${hook.id}/${hook.token}",`));
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
  name: "newareafree",
  category: "Server tools",
  description: "Creates all rooms, sets permissions, generates webhooks for new area",
  usage: "newarea"
};