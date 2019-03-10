const { version } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
let sql = new sqlite3.Database('./score.sqlite');
let uname = "";

sql.serialize(() => {
  // Queries scheduled here will be serialized.
  sql.get(`SELECT count(*) as 'count' FROM accounts WHERE lvl =5 AND lvl_checkout = 0 AND scan_checkout = 0`, (err, row) => {
    if (err) {
      console.error(err.message);
      return
    }
    if (row.count == 0) {
      message.reply(`No level 5 accounts available`);
      return
    }
    message.reply(`${row.count} Level 5 accounts available`);

    
  });
});






};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["lvl5count"],
  permLevel: "CVMod"
};

exports.help = {
  name: "lvl5count",
  category: "CVM Tools",
  description: "Returns",
  usage: "getlvl5"
};