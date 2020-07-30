exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const exclude = ["CVMapper", "Cartographer","EqDonor","CVMod", "Raid Coordinator","CVMember"];
const plusRoles = ["All+", "Davis+", "Dixon+", "Fairfield+", "Woodland+", "Vacaville+", "Winters+", "North Natomas+"];


message.guild.members.forEach(async mem =>  {
  //setTimeout(function(){console.log(`${mem.user.username}`)}, 1000);
if (!mem.roles.some(r=>exclude.includes(r.name)) & !mem.user.bot) {
  mem.roles.filter(r=>plusRoles.includes(r.name)).forEach(async mr=> removePlusRole(message,mem,mr));
}
});


};

async function removePlusRole (message,mem,mr) {
  plusRole = await message.guild.roles.find(r=>r.name.toLowerCase() == mr.name.toLowerCase());
  if (mem.roles.has(plusRole.id)) {
      mem.removeRole(plusRole).catch(console.error).then(console.log(`${mem.displayName} lost ${plusRole.name}`));
      //console.log(`${mem.displayName} lost ${plusRole.name}`)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "remplusrole",
  category: "Server Tools",
  description: "Removes + Roles for people without proper role eg CVMember",
  usage: "remplusrole"
};
