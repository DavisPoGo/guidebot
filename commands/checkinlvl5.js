const { version } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
let sql = new sqlite3.Database('./score.sqlite');


sql.serialize(() => {
  // Queries scheduled here will be serialized.
  sql.get(`SELECT * FROM accounts WHERE lvl =1 AND lvl_checkout = 1 AND scan_checkout = 0 AND usr = "${args.join()}"`, (err, row) => {
    if (err) {
      console.error(err.message);
      return
    }
    if (!row) {
      message.reply(`Couldn't find account with Username: ${args.join()}`);
      return
    }

    sql.run(`UPDATE accounts SET lvl_checkout = 0, lvl = 5 WHERE usr = "${args.join()}"`, function(err) {
      if (err) {
        console.error(err.message);
        return
      }
      if (this.changes = 1) {
        message.reply(`Sucessfully checked in level 5 account Username: ${args.join()}`);
      } else {
        message.reply(`Couldn't find account with Username: ${args.join()}`);
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
  aliases: ["checkinlvl5"],
  permLevel: "CVMod"
};

exports.help = {
  name: "checkinlvl5",
  category: "CVM Tools",
  description: "Gets a new account for levelling",
  usage: "checkinlvl5 'Username'"
};