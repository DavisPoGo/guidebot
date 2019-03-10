const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const areas = ["All", "Davis", "Dixon", "Fairfield", "Woodland", "Vacaville", "Winters", "North Natomas"];
CVMemberRole = await message.guild.roles.find(r=>r.name.toLowerCase() == "cvmember");
console.log(`${CVMemberRole}`);
const user = message.mentions.users.first();
const roleFlag = message.guild.roles.some(r=>args.slice(0).join(" ").includes(r.name));
console.log(`${user}, ${roleFlag}`);
if (!user || !roleFlag) return message.reply('Must specify a user and role!');
const role = message.guild.roles.find(r=>args.slice(0).join(" ").includes(r.name));
console.log(`${user}, ${role}`);
message.guild.fetchMember(user).then(mem=> {
	mem.addRole(role);
	message.reply(`${mem.displayName} added to role ${role.name}`);
  if (role==CVMemberRole) {
    mem.roles.filter(r=>areas.includes(r.name)).forEach(async mr=> assignPlusRole(message,mem,mr));
    //await mem.kick().then(() => console.log(`Kicked ${mem.displayName}`)).catch(console.error);
  } 
	}).catch(error => console.log(error.stack));


 
if (role.name == "CVM Gold") {
  user.send(`Thanks for signing up to be a ${role.name}. For information on how to set up your alert area(s), head to the faq channel.
    For setting up CVMiner, go to the cvminer_commands channel. Enjoy!`)
}
else {
  user.send(`Thanks for signing up to be a ${role.name}. For information on how to set up your alert area(s), head to the faq channel`)
}


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
  name: "assign",
  category: "Server Tools",
  description: "Assign roles",
  usage: "assign"
};