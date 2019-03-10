const { version } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
let sql = new sqlite3.Database('./score.sqlite');


sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`, (err, row) => {
  if (err) {
    console.error(err.message);
    return
  }
  message.reply(`Your current CVM level is ${row.level} and you have ${row.points} points`);
  sql.close();
});



};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cvm_level"],
  permLevel: "User"
};

exports.help = {
  name: "cvmlevel",
  category: "CVM Tools",
  description: "Displays CVM level",
  usage: "cvmlevel"
};