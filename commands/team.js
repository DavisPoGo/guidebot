const { version } = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

const teamNames = ["mystic", "valor", "instinct"]

let MysticRole = message.guild.roles.find(r=>r.name.toLowerCase() == "mystic");
let ValorRole = message.guild.roles.find(r=>r.name.toLowerCase() == "valor");
let InstinctRole = message.guild.roles.find(r=>r.name.toLowerCase() == "instinct");




if (!teamNames.includes(args[0].toLowerCase()) ) {
  return message.channel.send('Invalid team name. Acceptable choices are Mystic, Valor, or Instinct');
}

if (message.member.roles.some(r=>teamNames.includes(r.name.toLowerCase())) ) {
  message.channel.send('You already set your team. Why are you trying to change it? Contact CVMapper for help');
} else {
  message.member.addRole(message.guild.roles.find(r=>r.name.toLowerCase() == args[0].toLowerCase())).catch(console.error);
  message.channel.send(`${message.member.displayName}, you joined Team ${args[0]}`);
}



};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "team",
  category: "CVM Tools",
  description: "Join your PoGo team",
  usage: "$team <Mystic, Valor, or Instinct"
};
