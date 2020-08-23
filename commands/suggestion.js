const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let testEmbed = new discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Suggestion')
        .setURL('https://discord.js.org/')
        .setAuthor('code byLEVIATHAN', bot.user.avatarURL)
        .setDescription('Description')
        .setThumbnail(bot.user.avatarURL)
        //.addField('Regular Field Title', 'Field Body', false)
        .addBlankField()
        //.addField('Inline Field Title', 'Field Body', true)
        //.addField('Inline Field Title', 'Field Body', true)
        .setImage(bot.user.avatarURL)
        .setTimestamp()
        .setFooter('Footer Text', bot.user.avatarURL)

message.channel.send(testEmbed).then(async m => {
        await m.react('🗑')
        let filter = (reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id
        let result = m.createReactionCollector(filter, {max: 1})
        result.on('collect', (res) => {
             m.delete()
         })
   })


}

module.exports.help = {

    name: "suggestion"

}