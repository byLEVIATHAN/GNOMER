const discord = require("discord.js");


const Report = require("../models/report.js");
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://Ilyas:roermond0475@test-jpnvb.mongodb.net/test?retryWrites=true&w=majority';


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  });
  
  
   mongoose.connection.on('connected', () => {
     console.log('Mongoose is connected.');
   });


module.exports.run = async(bot, message, args) => {

  await message.delete();
  if (message.author.id != '254814619825078273') return;
  let rUser = message.mentions.members.first();
  if (!rUser) return message.reply("Can't find that member.");
  let rreason = args.slice(1).join(" ");
  if (!rreason) return message.reply("Please supply a reason.");
  
  
  const report = new Report({
    _id: mongoose.Types.ObjectId(),
    username: rUser.user.username,
    userID: rUser.id,
    reason: rreason,
    rUsername: message.author.username,
    rID: message.author.id,
    time: message.createdAt
  });
  
report.save()
  .then(result => console.log(result))
  .catch(err => console.log(err));
  
  
  message.reply("That report has been saved to the database!");
  
  
}

module.exports.help = {

    name: "report"

}