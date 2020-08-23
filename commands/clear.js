const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
  if(!args[0]) return message.channel.send("You need to specify how many messages you want to clear.");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(3000));
  });
}

module.exports.help = {

    name: "clear"

}