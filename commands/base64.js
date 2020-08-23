const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let text = args.join(" ");
    if(args[0] == 'encode'){  

        message.channel.send(new discord.RichEmbed()
.setDescription(Buffer.from(text).toString('base64')))
    }else if(args[0] == 'decode'){
   message.channel.send(new discord.RichEmbed()
.setDescription(Buffer.from(text, 'base64').toString('ascii')))
    }
  }


module.exports.help = {

    name: "base64"

}