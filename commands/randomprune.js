const { version } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
exports.run =  (client, message, args, level) => { // eslint-disable-line no-unused-vars

const exclude = ["CVMapper", "CVMod", "EqDonor", "Cartographer", "CVMod", "Raid Coordinator", "davismystic"];

// me = await message.guild.fetchMember(message.author);
let numToPrune = message.guild.memberCount - 2499;
let numPruned = 0;
let sql = new sqlite3.Database('./score.sqlite');
candidates = [];

sql.all(`SELECT userId, points FROM scores WHERE points < 4`, (err, rows) => {
	if (err) {
	  console.error(err.message);
	}
	rows.forEach(function(row) {candidates.push(row.userId)});

	do_next(candidates);
});

sql.close();



function do_next(candidates)
{
console.log("Length is" + candidates.length);
message.guild.members.filter(m=>m.roles.every(r=>!(exclude.includes(r.name) || r.name.includes("|"))) && candidates.includes(m.id))
.random(numToPrune).forEach(function(m) {
	setTimeout(function(){
		m.send("In order for push notification to function on CVM, the number of members must be below 2500. To reach this number, You were selected "+
			"for random removal based on contribution status and activity level. You can rejoin the server using "+
			"this link: https://discord.gg/ndG7HWp Thanks for understanding").then(function() {
		 	// console.log("Will kick" + m.displayName);
		 	m.kick("Random Prune").then(() => console.log(`Kicked ${m.displayName}`)).catch(console.error);
		 }, function(error) {console.error})}, 2000);
});
}


// message.guild.members.filter(m=>m.roles.every(r=>!(exclude.includes(r.name) || r.name.includes("|"))))
// 	.random(numToPrune).forEach(function(m) {
// 		setTimeout(function(){
// 			me.send(`You have been randomly selected for removal from the CVM server.\ 
// 			 In order for push notification to function, the number of members must be below 2500. You were selected randomly from all members\ 
// 			 that have not contributed and have low activity on the server. You can rejoin the server using this link: https://discord.gg/ndG7HWp\
// 			 If you rejoin, please consider contributing. Thanks!`).then(function() {
// 			 	m.kick("Random Prune").then(() => console.log(`Kicked ${m.displayName}`)).catch(console.error);
// 			 }, function(error) {console.error})}, 2000);
// 	});


  //   do {
  //   	roleLevel = "";
  //       candidate = message.guild.members.random();

  //       if (candidate.roles.some(r=>r.name.includes("|"))) {
		//   roleLevel = candidate.roles.find(r=>r.name.includes("|")).name.split("|")[0].split("-")[1].toLowerCase();
		// } else if (candidate.roles.some(r=>premierTier.includes(r.name))) {
		//   roleLevel = "gold";
		// }

		// if (!roleLevel)

  //       if (!candidate.roles.some(r=>r.name.includes("|"))){
            
  //       }
  //   } while numPruned < numToPrune

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "randomprune",
  category: "Server Tools",
  description: "Prunes a random not paying member",
  usage: "randomprune"
};