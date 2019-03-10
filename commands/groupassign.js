const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars


const areas = ["All", "Davis", "Dixon", "Fairfield", "Woodland", "Vacaville", "Winters", "North Natomas"];
CVMemberRole = await message.guild.roles.find(r=>r.name.toLowerCase() == "cvmember");

const role = message.guild.roles.find(r=>args.slice(0).join(" ").includes(r.name));


message.mentions.users.map(async user => {
  message.guild.fetchMember(user).then(mem=> {
  mem.addRole(role);
  message.reply(`${mem.displayName} added to role ${role.name}`);
  if (role==CVMemberRole) {
    mem.roles.filter(r=>areas.includes(r.name)).forEach(async mr=> assignPlusRole(message,mem,mr));
    //await mem.kick().then(() => console.log(`Kicked ${mem.displayName}`)).catch(console.error);
  } 
  }).catch(error => console.log(error.stack));
});


async function assignPlusRole (message,mem,mr) {
  plusRole = await message.guild.roles.find(r=>r.name.toLowerCase() == mr.name.toLowerCase() + "+");
  if (!mem.roles.has(plusRole.id)) {
      mem.addRole(plusRole).catch(console.error).then(console.log(`${mem.displayName} given ${plusRole.name}`));
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
  name: "groupassign",
  category: "Server Tools",
  description: "Assign roles",
  usage: "groupassign"
};