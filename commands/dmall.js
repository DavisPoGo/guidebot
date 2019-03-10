
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

const exclude = ["CVMapper", "Cartographer"];

message.guild.members.forEach(async mem =>  {

  if (mem.roles.some(r=>exclude.includes(r.name)) || mem.user.bot) {
    return
  }
  if (mem.roles.size == 1) {
    await setTimeout(function(){mem.send(`Hello, after the recent removal of Elk Grove, Sacramento, Benicia, and Vallejo from the CVM server, you are not currently assigned to any areas in the server. In order to get under the 2500 member limit that prevents push notifications, everyone that is not currently assigned an area will be removed from the server. If you would like to rejoin CVM, here is the invite link: https://discord.gg/twzNj4G. Hope to see you again!`).then(() => console.log(`Pre-Kick ${mem.displayName}`)).catch(console.error)}, 2000);
       } 
  else {
    await setTimeout(function(){mem.send(`Hello, Thanks for being a member of CVM. I'm working on pruning the server to get under the 2500 member so push notifications work. Since you are assigned to an active area, you are safe. But just in case something goes wrong, I wanted to make sure you have the server invite https://discord.gg/twzNj4G`).then(() => console.log(`NoKick ${mem.displayName}`)).catch(console.error)}, 2000);
     
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
  name: "dmall",
  category: "Server Tools",
  description: "dms everyone in server",
  usage: "dmall"
};