var express = require('express');
var app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const discord  = require("discord.js")
const bot = new discord.Client()
const TOKEN = process.env.TOKEN

const config = process.env

const fs = require("fs");

const active = new Map();

const talkedRecently = new Set();

const antispam = require('better-discord-antispam');

const levelfile = require("./data/level.json");




bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) =>{


    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <=0) {
        console.log("Could not find any files.");
        return;
    }


    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`The file ${f} has been retrieved.`);

        bot.commands.set(fileGet.help.name, fileGet);


    })
  
});







bot.on("ready", async () => {
  
  bot.user.setActivity(`on ${bot.guilds.size} servers`);
  console.log(`Ready to serve on ${bot.guilds.size} servers, for ${bot.users.size} users.`);
  
	// const welcome = bot.channels.find(c => c.name === 'welcome');
	// welcome.fetchMessages({ limit: 10 }).then(collected => console.log('Fetched ' + collected.size + ' messages.')).catch(console.error);

console.log(`${bot.user.username} is online!`);
  

bot.user.setActivity("YOUSZ'S BUNKER", {type: "WATCHING"});


  
  
  
  const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
	muteThreshold: 5, // Amount of messages sent in a row that will cause a mute.
	maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
	banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
	muteMessage: '**{user_tag}** has been muted for spamming.', // Message that will be sent in chat upon muting a user.
	maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 9, // Amount of duplicate messages that trigger a warning.
	// Discord permission flags: https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS
	exemptPermissions: [ 'BAN_MEMBERS'], // Bypass users with any of these permissions(These are not roles so use the flags from link above).
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: ['byLEVIATHAN#6917'], // Array of User IDs that get ignored.
	// And many more options... See the documentation.
});
  
  
  bot.on('message', (message) => antiSpam.message(message));
  
  
});
 


bot.on("guildMemberAdd", member => {
  
 
//     const channel = member.guild.channels.find("name", "🤝-general");
//     if (!channel) console.log("Could not find the specified channel.");
 
//     var joinEmbed = new discord.RichEmbed()
//         .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
//         .setDescription(`Hey ***${member.user.username}***, **Welcome to Yousz's Bunker**. Use **>help** if you need some help. :grinning:`)
//         .setColor("#db2a41")
//         .setTimestamp()
//         .setFooter("User joined. ");
 
//     channel.send(joinEmbed);
 
  
  
    const memberRole = member.guild.roles.find(r => r.name === 'Member');
  
  if (!memberRole) return;
  
    try {
      member.addRole(memberRole);
    } catch (error) {
      console.error(`Failed to add a Member role to user ${memberRole.user.username}. Error: ${error}`);
    }
  
  
  
});







// bot.on("guildMemberRemove", member => {
  
 
//     const channel = member.guild.channels.find("name", "🤝-general");
//     if (!channel) console.log("Could not find the specified channel.");
 
//     var leaveEmbed = new discord.RichEmbed()
//         .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
//         .setDescription(`**${member.user.username}** has left the server. :slight_frown:`)
//         .setColor("#db2a41")
//         .setTimestamp()
//         .setFooter("User left.");
 
//     channel.send(leaveEmbed);
 
// });








bot.on("message", async message => {

   
    //If the bot sends a message then return
    if(message.author.bot) return;
  
   if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

   // if (!message.content.startsWith(prefix) || message.author.bot) return;


    if(message.channel.type === "dm") return;


    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));
  

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
         prefixes: config.prefix };
    }



    var prefix = prefixes[message.guild.id].prefixes;
  
  
  
  // Inside your message event, this code will stop any command during cooldown.
// Should be placed after your code that checks for bots & prefix, for best performance

if (talkedRecently.has(message.author.id))
  return;

// Adds the user to the set so that they can't talk for 2.5 seconds
talkedRecently.add(message.author.id);
setTimeout(() => {
  // Removes the user from the set after 2.5 seconds
  talkedRecently.delete(message.author.id);
}, 5000);
  

  
  

  
  
  

   // var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));
  
  


    var options = {

        active: active

    }



    if(commands) commands.run(bot, message, arguments, options);
  
    
  
//  var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));
//     var msg = message.content.toLowerCase();

//     for (var i = 0; i < swearWords["swearWords"].length; i++) {

//         if (msg.includes(swearWords["swearWords"][i])) {

//             message.delete();

//             return message.channel.send("Please refrain from profanity.").then(msg => msg.delete(2000));

//         }

//     }
    
  
});






// bot.on('messageDelete', (messageDelete) => {
//     let DeleteEmbed = new discord.RichEmbed()
//     .setTitle("**DELETED MESSAGE**")
//     .setColor("#fc3c3c")
//     .addField("Author", messageDelete.author.tag)
//     .addField("Channel", messageDelete.channel)
//     .addField("Message", messageDelete.content)
//     .setFooter(`Message ID: ${messageDelete.id} | Author ID: ${messageDelete.author.id}`);
  
//     let DeleteChannel = messageDelete.guild.channels.find(x => x.name === "bot-logs");
//     DeleteChannel.send(DeleteEmbed);
// });



// bot.on("message", async message => {
  
  
//   var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));
//     var msg = message.content.toLowerCase();

  
  
//   if(message.member.hasPermission("BAN_MEMBERS")) return;
//      if(message.member.roles.has("675361368517378104")) return;
//      if(message.member.hasPermission("ADMINISTRATOR")) return;
  
  
//     for (var i = 0; i < swearWords["swearWords"].length; i++) {

//         if (msg.includes(swearWords["swearWords"][i])) {

//             message.delete();

//             return message.reply("Please refrain from profanity.").then(msg => msg.delete(5000));

//         }

//     }
  
  
// });



bot.on("message", async message => {
  
  
  var links = JSON.parse(fs.readFileSync("./data/links.json"));
    var msg = message.content.toLowerCase();

    
     if(message.member.hasPermission("BAN_MEMBERS")) return;
     if(message.member.roles.has("666376728767234097")) return;
     
  
    for (var i = 0; i < links["links"].length; i++) {

        if (msg.includes(links["links"][i])) {

            message.delete();

            return message.reply("Please refrain from posting links.").then(msg => msg.delete(3000));

        }

    }
  
  
});





// const AntiSpam = require('discord-anti-spam');
// const antiSpam = new AntiSpam({
// 	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
// 	kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
// 	banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
// 	maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
// 	warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
// 	kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
// 	banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
// 	maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
// 	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
// 	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
// 	exemptPermissions: [ 'ADMINISTRATOR', 'BAN_MEMBERS'], // Bypass users with any of these permissions.
// 	ignoreBots: true, // Ignore bot messages.
// 	verbose: true, // Extended Logs from module.
// 	ignoredUsers: [], // Array of User IDs that get ignored.
// 	// And many more options... See the documentation.
  
//  });


// bot.on('message', (message) => antiSpam.message(message)); 


// bot.on('message', async message =>  {
 
  
//   // Genereer random xp.
//     var randomxp = Math.floor(Math.random(1) * 15) + 1;

//     // Verkrijg id van de gebruiker.
//     var idUser = message.author.id;

//     // console.log(randomxp);

//     // Als persoon nog niet in file is maak dan standaard aan.
//     if (!levelfile[idUser]) {

//         levelfile[idUser] = {

//             xp: 0,
//             level: 0

//         };

//     }

//     // Voeg xp toe.
//     levelfile[idUser].xp += randomxp;

//     // Verkrijg level van de gebruiker.
//     var levelUser = levelfile[idUser].level;
//     // Verkrijg xp van de gebruiker.
//     var xpUser = levelfile[idUser].xp;
//     // Bereken volgend level op basis van de xp.
//     var nextLevelXp = levelUser * 300;
    
//     // Als het level 0 is zet dan xp op 100.
//     if (nextLevelXp === 0) nextLevelXp = 100;

//     console.log(nextLevelXp + " " + xpUser);

//     // Als gebruikeer volgend level heeft bereikt zet level 1 hoger en zet in file.
//     // Let op Nodemon restart wegens dat we de file als require hebben binnengehaald.
//     if (xpUser >= nextLevelXp) {

//         levelfile[idUser].level += 1;

//         // Wegschrijven van data. Je kan dit ook altijd opslaan maar dit zorgt ervoor dat het data
//         // verkeer te groot wordt.
//         fs.writeFile("./data/level.json", JSON.stringify(levelfile), err => {

//             if (err) console.log(err);

//         });

//         // Zenden van een embed met gegevens.
//         var embedLevel = new discord.RichEmbed()
//             .setDescription("***LEVEL UP***")
//             .setColor("RANDOM")
//             .addField("Level Up: ", levelfile[idUser].level);

//         message.channel.send(embedLevel);

//     }

// });



// const TEST_ROLE = '678700561054564356';
// const TEST2_ROLE = '678701510372360209';
// const TEST3_ROLE = '678732999180943386';



// bot.on('message', (message) => {
//     const parts = message.content.split(' ');

//     if (parts[0] == '!!role') {

//         if(parts[1] == 'test') {
//             message.member.addRole(TEST_ROLE);
//         }
//         else if(parts[1] == 'test2') {
//             message.member.addRole(TEST2_ROLE);
//         }
//         else if(parts[1] == 'test3') {
//             message.member.addRole(TEST3_ROLE);
//         }

//     }

// });






bot.login(TOKEN)