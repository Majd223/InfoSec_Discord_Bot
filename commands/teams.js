module.exports = {
    name: 'teams',
    description: "gives team color depending on the reaction",
    async execute(message, args, Discord, client) {

        //the channel ID that will be used for the roles message 
        const channel = '849184159020351518';

        //1 const for each the role
        const blueTeam = message.guild.roles.cache.find(role => role.name === "Blue team");
        const redTeam = message.guild.roles.cache.find(role => role.name === "Red team");

        //Set the emojis you will use on the message.
        const redEmoji = '🟥';
        const blueEmoji = '🟦';

        //Create an Embed that explain each reaction and what it does.
        let embed = new Discord.MessageEmbed()
            .setColor('#63a263')
            .setTitle('Team color')
            .setDescription('Red teams are offensive security professionals who attack systems and break them into defenses. Blue teams are defensive security professionals responsible for building the internal network defenses against all attacks and threats.\n\n'
                + `${redEmoji} for red team\n`
                + `${blueEmoji} for blue team`);
        
        let messageEmbed = await message.channel.send(embed);

        //Let the bot react to the embed the bot is going to post.
        messageEmbed.react(redEmoji);
        messageEmbed.react(blueEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {

            //use the partials that was added in main.js
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();

            //anyone who reacts enter the event of 'receiving a role', the bot shouldnt be one.
            if (user.bot) return;

            //Whoever reacts should be in the guild aka server
            if (!reaction.message.guild) return;

            //Let the bot know which channel is being used for reactions, otherwise the bot will look everwhere.
            if(reaction.message.channel.id === channel) {
                //for red team
                if (reaction.emoji.name === redEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(redTeam);
                }
                //for blue team
                if (reaction.emoji.name === blueEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeam);
                }
            } else {
                return;
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {

            //use the partials that was added in main.js
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();

            //anyone who reacts enter the event of 'receiving a role', the bot shouldnt be one.
            if (user.bot) return;

            //Whoever reacts should be in the guild aka server
            if (!reaction.message.guild) return;

            //Let the bot know which channel is being used for reactions, otherwise the bot will look everwhere.
            if(reaction.message.channel.id === channel) {
                //for red team
                if (reaction.emoji.name === redEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(redTeam);
                }
                //for blue team
                if (reaction.emoji.name === blueEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueTeam);
                }
            } else {
                return;
            }
        });
    }
}