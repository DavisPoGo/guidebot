const { version } = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

const areas = ["All", "Davis", "Dixon", "Fairfield", "Woodland", "Vacaville", "Winters", "North Natomas","Elk Grove","Sacramento"];
const areaList = areas.join("\n");


const msg = message.channel.send("**You can recieve alerts for a particular area by typing:**\n`$addarea <areaname>`\n__(replace <areaname> with the are you want to recieve alerts for)__\n" + areaList);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "arealist",
  category: "CVM Tools",
  description: "Lists available areas",
  usage: "arealist"
};