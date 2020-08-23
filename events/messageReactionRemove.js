module.exports = async (bot, messageReaction, user) => {

    const message = messageReaction.message;
    const channel = message.guild.channels.find(c => c.name === 'welcome');
    const member = message.guild.members.get(user.id);
    if (member.user.bot) return;

    const a = message.guild.roles.get('678700561054564356'); // Moderator
    const b = message.guild.roles.get('678701510372360209'); // Administrator
    const c = message.guild.roles.get('678732999180943386'); // Developer

    if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === channel.id) {
        switch (messageReaction.emoji.name) {
            case '🇦':
                member.removeRole(a).catch(console.error);
                break;
            case '🇧':
                member.removeRole(b).catch(console.error);
                break;
            case '🇨':
                member.removeRole(c).catch(console.error);
                break;
            default:
                break;
        }
    }
};