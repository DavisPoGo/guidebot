const { version } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
let sql = new sqlite3.Database('./score.sqlite');
let uname = "";

sql.serialize(() => {
  // Queries scheduled here will be serialized.
  sql.each(`SELECT usr, pass FROM accounts WHERE lvl =1 AND lvl_checkout = 1 AND scan_checkout = 0 AND checkedout_by = ${message.author.id}`, (err, row) => {
    if (err) {
      console.error(err.message);
      return
    }
    // if (!row) {
    //   message.reply(`You don't have any Level 1 accounts checked out`);
    //   return
    // }
    message.reply(`Checked out Level 1: ${row.usr} | ${row.pass}`);
  });
});






};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mylvl1"],
  permLevel: "CVMod"
};

exports.help = {
  name: "mylvl1",
  category: "CVM Tools",
  description: "Returns",
  usage: "mylvll1"
};