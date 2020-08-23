const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");
const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    fetch("https://coronavirus-tracker-api.herokuapp.com/all")
    .then(res => res.json()).then(body => {
        let embed = new discord.RichEmbed()
             .setTitle("Coronavirus")
        
            .addField("Confirmed", stripIndents`
                **Total Cases:** ${body.confirmed.latest}
                **Total Locations:** ${body.confirmed.locations.length}
                **Last Updated:** ${body.confirmed.last_updated}
            `)
            .addField("Deaths", stripIndents`
                **Total Deaths:** ${body.deaths.latest}
                **Total Locations:** ${body.deaths.locations.length}
                **Last Updated:** ${body.deaths.last_updated}
            `)
            .addField("Recovered", stripIndents`
                **Total Recoveries:** ${body.recovered.latest}
                **Total Locations:** ${body.recovered.locations.length}
                **Last Updated:** ${body.recovered.last_updated}
            `)
        message.channel.send(embed)
    })

}

module.exports.help = {

    name: "coronavirus"

}