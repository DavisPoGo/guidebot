
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

const exclude = ["CVMapper", "Cartographer"];

message.guild.members.forEach(async mem =>  {
  setTimeout(function(){console.log(`${mem.user.username}`)}, 1000);
  if (mem.roles.some(r=>exclude.includes(r.name)) || mem.user.bot) {
    return
  }
  if (mem.roles.size == 1) {
	  await mem.kick().then(() => console.log(`Kicked ${mem.displayName}`)).catch(console.error);
  } 
  

});


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "prunekick",
  category: "Server Tools",
  description: "removes everyone not in an area",
  usage: "dmall"
};