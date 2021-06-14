module.exports = {
    name: 'CTF',
    description: "Gives roles to people interested in CTF",
    async execute(message, args, Discord, client) {

        //the channel ID that will be used for the roles message 
        const channel = '849184159020351518';

        //1 const for each the role
        const CTF = message.guild.roles.cache.find(role => role.name === "CTF");

        //Set the emojis you will use on the message.
        const flag = '🚩';

        //Create an Embed that explain each reaction and what it does.
        let embed = new Discord.MessageEmbed()
            .setColor('#63a263')
            .setTitle('Capture The Flag role')
            .setDescription('do you want to play CTF? \n CTF is security Capture the Flag, "flags" are secrets hidden in purposefully-vulnerable programs or websites. it happen every weekend select the flag emoji to receive updates when there is a CTF event.\n\n'
                + `${flag} for CTF role\n`);
        
        let messageEmbed = await message.channel.send(embed);

        //Let the bot react to the embed the bot is going to post.
        messageEmbed.react(flag);

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
                if (reaction.emoji.name === flag) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(CTF);
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
                if (reaction.emoji.name === flag) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(CTF);
                }
            } else {
                return;
            }
        });
    }
}