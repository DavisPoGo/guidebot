exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const exclude = ["CVMapper", "Cartographer","EqDonor","CVMod", "Raid Coordinator"];
const plusRoles = ["All+", "Davis+", "Dixon+", "Fairfield+", "Woodland+", "Vacaville+", "Winters+", "North Natomas+"];
CVMemberRole = await message.guild.roles.find(r=>r.name.toLowerCase() == "cvmember");
renewRole = await message.guild.roles.find(r=>r.name.toLowerCase() == "renew");
remcount =0;
addcount=0;
message.guild.members.forEach(async mem =>  {
  //setTimeout(function(){console.log(`${mem.user.username}`)}, 1000);
  if (!mem.roles.some(r=>exclude.includes(r.name)) & !mem.user.bot) {
    if (mem.roles.has(renewRole.id)) {
      if (mem.roles.has(CVMemberRole.id)) {
  	    console.log(`${mem.displayName} renewed and already had CVMember role`);
      } else {
        console.log(`${mem.displayName} renewed and needs CVMember role`);
        mem.addRole(CVMemberRole).catch(console.error);
        addcount=addcount+1;
      }
    } else {
      if (mem.roles.has(CVMemberRole.id)) {
        //console.log(`${mem.displayName} remove CVMember role`);
        remcount=remcount+1;
        mem.removeRole(CVMemberRole).catch(console.error).then(console.log(`${mem.displayName} remove CVMember role`));
        mem.roles.filter(r=>plusRoles.includes(r.name)).forEach(async mr=> removePlusRole(message,mem,mr));
      } 
    }
  }

});

console.log(`remcount:${remcount} addcount:${addcount}`);
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
  name: "renew",
  category: "Server Tools",
  description: "renew",
  usage: "renew"
};
