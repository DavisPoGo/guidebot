const { version } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
let sql = new sqlite3.Database('./score.sqlite');
let uname = "";

sql.serialize(() => {
  // Queries scheduled here will be serialized.
  sql.run(`DELETE from accounts WHERE lvl =1 AND lvl_checkout = 1 AND scan_checkout = 0 AND usr = "${args.join()}"`, (err, row) => {
    if (err) {
      console.error(err.message);
      return
    }
    // if (!row) {
    //   message.reply(`You don't have any Level 1 accounts checked out`);
    //   return
    // }
    message.reply(`Removed account with username: ${args.join()}`);
  });
});






};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rm_account"],
  permLevel: "CVMod"
};

exports.help = {
  name: "rm_account",
  category: "CVM Tools",
  description: "Removes bad account",
  usage: "rm_account <username>"
};