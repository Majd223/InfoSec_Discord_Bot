const { Message } = require("discord.js")

module.exports = {
    name: 'stonks',
    description: "this is stonks",
    execute(message, args){
        message.channel.send("stonks indeed");
    }
}