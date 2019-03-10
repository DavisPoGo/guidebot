const { version } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars


teamRole =  await message.guild.roles.find(r=>r.name.toLowerCase() == args[0].toLowerCase());
console.log(`${teamRole}`);
message.guild.members.forEach(async (mem) =>  {
  // console.log(`${mem} and ${mem.roles.size}`);
    if (mem.roles.size == 1) {
      console.log(`Yes ${mem.user.username}`);
      if(mem.roles.find("name",args[0])) {
        // console.log(`Yes ${mem.user.username}`);
        // await mem.removeRole(teamRole);
      }
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
  name: "teamdel",
  category: "Server Tools",
  description: "Assign roles",
  usage: "teamdel <role>"
};