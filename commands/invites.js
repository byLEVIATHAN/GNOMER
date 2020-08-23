const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (message.content === '!!invites') {

        var userId = message.author.id;

        var userInvites = message.guild.fetchInvites().then(invites => invites.find(invite => invite.inviter.id === userId));

        var useAmount = userInvites.uses;

        if (useAmount === undefined) {

            message.channel.send(`${message.author.username} has 0 invites`);
        }

        else {

            message.channel.send(`${message.author.username} has ${useAmount} invites`);
        }
    }
}

module.exports.help = {

    name: "invites"

}