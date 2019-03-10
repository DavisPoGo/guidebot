
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const exclude = ["CVMapper", "Cartographer"];
const areas = ["All", "Davis", "Dixon", "Fairfield", "Woodland", "Vacaville", "Winters", "North Natomas"];
CVMemberRole = await message.guild.roles.find(r=>r.name.toLowerCase() == "cvmember");


message.guild.members.forEach(async mem =>  {
  setTimeout(function(){}, 1000);
  
  //if (mem.roles.some(r=>areas.includes('CVMember'))) {
  if (mem.roles.has(CVMemberRole.id)) {
    console.log(`CVMember ${mem.displayName}`);
    mem.roles.filter(r=>areas.includes(r.name)).forEach(async mr=> assignPlusRole(message,mem,mr));
	  //await mem.kick().then(() => console.log(`Kicked ${mem.displayName}`)).catch(console.error);
  } 
  

});

async function assignPlusRole (message,mem,mr) {
  plusRole = await message.guild.roles.find(r=>r.name.toLowerCase() == mr.name.toLowerCase() + "+");
  if (!mem.roles.has(plusRole.id)) {
      mem.addRole(plusRole).catch(console.error).then(console.log(`${mem.displayName} given ${plusRole.name}`));
  //console.log(`${mem.displayName} given ${plusRole.name}`)
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
  name: "convertplususer",
  category: "Server Tools",
  description: "Converts user persmissions for CVMembers when convert to plus",
  usage: "convertplususer"
};