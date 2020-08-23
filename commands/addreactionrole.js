const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    
    let array2 = []

    message.channel.send('How many roles do you want to add? (20 MAX)')

    const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
        max: 1,
        time: 30000,
    })
    if (!msgs.size) return message.channel.send('Did not get a valid response within 30 seconds, cancelling.')
    if (msgs.first().content <= 0) return message.channel.send('Integer must be larged than 0.')
    if (msgs.first().content > 20) return message.channel.send('Integer was larger than 20, cancelling.')


    let value = parseInt(msgs.first().content)


    while(value > 0) {

        message.channel.send('Now give me the `NAME` of the role you wish to add.')


        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000,
        })

        if (!msgs.size) return message.channel.send('Did not get a valid response within 30 seconds, cancelling.')
 

        let roles = bot.reactionroles.get(message.guild.id, "roles")
        let role = message.guild.roles.find(r => r.name === msgs.first().content)
        if (!role) return message.channel.send('Could not find that role, returning.') // continue if you don't want to return

        if (roles.includes(msgs.first().content)) return message.channel.send('You already had that role added onto a message, remove it before adding it again.')


        message.channel.send(`Now give me the emoji **name** or **id**.`)
        const emojiInput = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000,
        })

        if (!emojiInput.size) return message.channel.send('Did not get a valid response within 30 seconds, cancelling.')

        let emoji = bot.emojis.get(emojiInput.first().content) || bot.emojis.find(e => e.name === emojiInput.first().content)
        if (!emoji) return message.channel.send('Could not find that emoji, returning.')


        bot.reactionroles.push(message.guild.id, {emoji: emoji.name, emojiid: emoji.id, role: msgs.first().content}, "roles")
        value--
        array2.push({id: emoji.id, role: msgs.first().content, name: emoji.name})

    }


    let array = bot.reactionroles.get(message.guild.id, "roles")
    let embed = new discord.MessageEmbed()
    .setAuthor('React to get a role!', message.guild.iconURL)
    .setDescription(array2.map(i => `${bot.emojis.get(i.id)} => ${message.guild.roles.get(message.guild.roles.find(r => r.name === i.role).id)}`))
    .setColor("RANDOM")
    message.channel.send(embed).then(m => {

        bot.reactionroles.push(message.guild.id, m.id, "ids")
        for (var i = 0; i < array.length; i++) {
            m.react(array2[i].id)
        }

        array2.length = 0;

    })



}

module.exports.help = {

    name: "addreactionrole"

}