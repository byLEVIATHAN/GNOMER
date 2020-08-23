module.exports = async (bot, messageReaction, user) => {

    const message = messageReaction.message;
    const channel = message.guild.channels.find(c => c.name === 'welcome');
    const member = message.guild.members.get(user.id);
    if (member.user.bot) return;

    const a = message.guild.roles.get('678700561054564356'); // Test
    const b = message.guild.roles.get('678701510372360209'); // Test2
    const c = message.guild.roles.get('678732999180943386'); // Test3

    // Adds/removes a user from a joinable role via the welcome
    if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === channel.id) {
        switch (messageReaction.emoji.name) {
            case '🇦':
                member.addRole(a).catch(console.error);
                break;
            case '🇧':
                member.addRole(b).catch(console.error);
                break;
            case '🇨':
                member.addRole(c).catch(console.error);
                break;
            default:
                break;
        }
    }
};