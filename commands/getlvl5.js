const { version } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
let sql = new sqlite3.Database('./score.sqlite');
let uname = "";

sql.serialize(() => {
  // Queries scheduled here will be serialized.
  sql.get(`SELECT * FROM accounts WHERE lvl =5 AND lvl_checkout = 0 AND scan_checkout = 0`, (err, row) => {
    if (err) {
      console.error(err.message);
      return
    }
    if (!row) {
      message.reply(`No level 5 accounts available`);
      return
    }
    message.reply(`Username: ${row.usr} | Password ${row.pass}`);

    sql.run(`UPDATE accounts SET scan_checkout = 1 WHERE usr = "${row.usr}"`, function(err) {
      if (err) {
        console.error(err.message);
        return
      }
      console.log(`Row(s) updated: ${this.changes}  ${uname}`);
      sql.close();
    });
  });
});






};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["getlvl5"],
  permLevel: "CVMod"
};

exports.help = {
  name: "getlvl5",
  category: "CVM Tools",
  description: "Gets a level 5 account for scanning",
  usage: "getlvl5"
};