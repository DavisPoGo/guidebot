const { version } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
let sql = new sqlite3.Database('./score.sqlite');

sql.serialize(() => {
  // Queries scheduled here will be serialized.
  sql.get(`SELECT * FROM accounts WHERE lvl =1 AND lvl_checkout = 0 AND scan_checkout = 0`, (err, row) => {
    if (err) {
      console.error(err.message);
      return
    }
    if (!row) {
      message.reply(`No level 5 accounts available`);
      return
    }
    message.reply(`Username: ${row.usr} | Password ${row.pass}`);

    sql.run(`UPDATE accounts SET lvl_checkout = 1, checkedout_by = ${message.author.id} WHERE usr = "${row.usr}"`, function(err) {
      if (err) {
        console.error(err.message);
        return
      }
      console.log(`Row(s) updated: ${this.changes}`);
      sql.close();
    });
  });
});






};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["checkoutlvl1"],
  permLevel: "CVMod"
};

exports.help = {
  name: "checkoutlvl1",
  category: "CVM Tools",
  description: "Gets a new account for levelling",
  usage: "checkoutlvl1"
};