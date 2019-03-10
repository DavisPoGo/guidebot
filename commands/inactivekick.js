
const sqlite3 = require('sqlite3').verbose();
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

const exclude = ["CVMapper", "Cartographer", "CVMember", "CVMBot", "CVM Helper", "CVMod", "Raid Coordinator", "Event Coordinator", "Event Sponsor", "RDM-Stat-Bot"];

let sql = new sqlite3.Database('./score.sqlite');
let uname = "";

sql.serialize(() => {
  // Queries scheduled here will be serialized.
  sql.each(`SELECT userId FROM scores WHERE updated IS null AND points <20`,  (err, row) => {
    if (err) {
      console.error(err.message);
      return
    }
    if (!message.guild.members.has(row.userId)){
      return
    }
    mem =  message.guild.members.get(row.userId);

    if (mem.roles.some(r=>exclude.includes(r.name)) || mem.user.bot) {
      return
    } else {
      mem.removeRoles(mem.roles);
      console.log(`Pre-Kick ${mem.displayName}`);
      // mem.send(`Hello, I need to do a significant pruning of the CVM server to reduce the number of members to under 2500 because exceeding this number of members causes push notifications to stop. About a week ago, I made an annoucement stating that in order to retain access to the CVM server you needed to make a post somewhere in the server. It doesn't look like you made a post. So, you will be removed from the server. If you would like to rejoin CVM, here is the invite link: https://discord.gg/twzNj4G. Hope to see you again!`);
      // console.log(`Pre-Kick ${mem.displayName}`);
    }
    });
    
});









};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "inactivekick",
  category: "Server Tools",
  description: "removes everyone not in an area",
  usage: "inactivekick"
};