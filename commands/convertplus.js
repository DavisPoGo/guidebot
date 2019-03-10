const { version } = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
const paidChannels = ["pokemon", "100iv", "90iv", "event", "unown"];

var everyone = message.guild.defaultRole.id;
// message.guild.channels.map(c => console.log(`${c.name.substring(c.name.lastIndexOf("_")+1)}`));
// message.guild.channels.filterArray(c => paidChannels.includes(c.name.substring(c.name.lastIndexOf("_")+1))).map(async chan => setChanPerm(chan));


message.guild.channels.filter(c => c.type === 'category' && c.name.charAt(0) === '.').map(cat => makePlusCat(cat));


async function makePlusCat(cat) {
  var regRole = await message.guild.roles.find(r=>r.name.toLowerCase() === cat.name.substring(1).toLowerCase());
  await message.guild.createRole({ 
    name: regRole.name + "+",
    hoist: false,
    mentionable: false,
  }).then(function(role) {
    plusRole = role;
  });
  cat.children.filter(c => paidChannels.includes(c.name.substring(c.name.lastIndexOf("_")+1))).map(async chan => setChanPerm(chan,regRole,plusRole));
}

async function setChanPerm (chan,regRole,plusRole) {


  await chan.overwritePermissions(plusRole, {SEND_MESSAGES: false,VIEW_CHANNEL: true});
  await chan.overwritePermissions(regRole, {SEND_MESSAGES: false,VIEW_CHANNEL: false});
  await chan.overwritePermissions(everyone, {VIEW_CHANNEL: false});

}


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "convertplus",
  category: "Server Tools",
  description: "Creates a new channel for each area",
  usage: "convertplus"
};
