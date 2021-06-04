module.exports = {
    name: 'years',
    description: "This creates the embed that gives the roles 1st-2nd year and 3rd-4th year.",
    async execute(message, args, Discord, client) {

        //the channel ID that will be used for the roles message 
        const channel = '849184159020351518';

        //1 const for each the role
        const firstSecond = message.guild.roles.cache.find(role => role.name === "1st-2nd");
        const thirdForth = message.guild.roles.cache.find(role => role.name === "3rd-4th");

        //Set the emojis you will use on the message.
        const oneEmoji = '1️⃣';
        const twoEmoji = '2️⃣';

        //Create an Embed that explain each reaction and what it does.
        let embed = new Discord.MessageEmbed()
            .setColor('#63a263')
            .setTitle('Years')
            .setDescription('Choose the Year you are in\n\n'
                + `${oneEmoji} : for 1st-2nd year\n`
                + `${twoEmoji} : for 3rd-4th year`);
        
        let messageEmbed = await message.channel.send(embed);

        //Let the bot react to the embed the bot is going to post.
        messageEmbed.react(oneEmoji);
        messageEmbed.react(twoEmoji);

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
                //for 1st-2nd team
                if (reaction.emoji.name === oneEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(firstSecond);
                }
                //for 3rd-4th team
                if (reaction.emoji.name === twoEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(thirdForth);
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
                //for 1st-2nd team
                if (reaction.emoji.name === oneEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(firstSecond);
                }
                //for 3rd-4th team
                if (reaction.emoji.name === twoEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(thirdForth);
                }
            } else {
                return;
            }
        });
    }
}