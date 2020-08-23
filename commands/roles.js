const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

   let rolesembed = new discord.RichEmbed()
    .setTitle("Available Roles")
    .setColor("RANDOM")
    .setAuthor("ILLICITTEST")
    .addField("Test")
    .addField("Test2")
    .addField("Test3")
    message.channel.send(rolesembed);
   
};

module.exports.help = {

    name: "roles"

}