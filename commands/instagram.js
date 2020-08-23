const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const axios = require('axios');
const prefix = '!!'

client.on('message', async msg => {
    if (!msg.content.startsWith(prefix)) {
        return;
    }
    const args = msg.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase()
    console.log(args)

    if (command === "instagram") {
      let getInfo = async () => {
        if(!args[0]) return msg.channel.send("Please provide an account name!");
        let response = await axios.get(`https://apis.duncte123.me/insta/${args.join(" ")}`);
        let info = response.data;
        return info;
      };
      let infoValue = await getInfo();
      console.log(infoValue);

      const embed = new MessageEmbed()
      .setTitle(`Instagram Stats | ILLICITTEST`)
      .setThumbnail(`${infoValue.user.profile_pic_url}`)
      .setDescription(`**Username:** ${infoValue.user.username}
      **Fullname:** ${infoValue.user.full_name}
      **Biography:** ${infoValue.user.biography}
      **Uploads:** ${infoValue.user.uploads.count}
      **Followers:** ${infoValue.user.followers.count}
      **Following:** ${infoValue.user.following.count}
      **Private:** ${infoValue.user.is_private}
      **Verified:** ${infoValue.user.is_verified}`)
      .setTimestamp()

      msg.channel.send({embed})
    }    
});

module.exports.help = {

    name: "hallo"

}