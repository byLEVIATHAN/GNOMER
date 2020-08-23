const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

   function duration(ms) {
  const times = {
    day: Math.floor((ms / (1000 * 60 * 60 * 24))),
    hour: Math.floor((ms / (1000 * 60 * 60)) % 24),
    minute: Math.floor((ms / (1000 * 60)) % 60),
    second: Math.floor((ms / 1000) % 60),
    week: Math.floor((ms / (1000 * 60 * 60 * 24 * 7)))
  };

  let string = ' ';

    for ( const [key, value] of Object.entries(times) ) {
      if(value > 0) string += `${value} ${key}${value > 1 ? 's' : ''}`
    }
      return `\`${string}\``
}

return message.channel.send(duration(bot.uptime));
  
}

module.exports.help = {

    name: "uptime"

}