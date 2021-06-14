module.exports = {
    name: 'disciplines',
    description: "Let people get roles to know what their discipline is",
    async execute(message, args, Discord, client) {

        //the channel ID that will be used for the roles message 
        const channel = '849184159020351518';

        //1 const for each the role
        const cyberSecur = message.guild.roles.cache.find(role => role.name === "Cybersecurity");
        const appDev = message.guild.roles.cache.find(role => role.name === "Application development");
        const businessInt = message.guild.roles.cache.find(role => role.name === "Business intelligence");
        const NSCOM = message.guild.roles.cache.find(role => role.name === "NSCOM");

        //Set the emojis you will use on the message.
        const cyberEmoji = '🕵️‍♂️';
        const appDevEmoji = '👨‍💻';
        const businessIntEmoji = '👨‍💼';
        const NSCOMemoji = '💻';

        //Create an Embed that explain each reaction and what it does.
        let embed = new Discord.MessageEmbed()
            .setColor('#63a263')
            .setTitle('Choose your major')
            .setDescription('React below with the major that you are in or interest you\n\n'
                + `${cyberEmoji} for Cybersecurity major\n`
                + `${appDevEmoji} for Application Development major\n`
                + `${businessIntEmoji} for Business Intelligence major\n`
                + `${NSCOMemoji} for NSCOM major`);
        
        let messageEmbed = await message.channel.send(embed);

        //Let the bot react to the embed that the bot is going to post.
        messageEmbed.react(cyberEmoji);
        messageEmbed.react(appDevEmoji);
        messageEmbed.react(businessIntEmoji);
        messageEmbed.react(NSCOMemoji);

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
                //for Cybersecurity
                if (reaction.emoji.name === cyberEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(cyberSecur);
                }
                //for appdev team
                if (reaction.emoji.name === appDevEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(appDev);
                }
                //for BI
                if (reaction.emoji.name === businessIntEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(businessInt);
                }
                //for NSCOM
                if (reaction.emoji.name === NSCOMemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(NSCOM);
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
                //for Cybersecurity team
                if (reaction.emoji.name === cyberEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(cyberSecur);
                }
                //for appdev team
                if (reaction.emoji.name === appDevEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(appDev);
                }
                //for BI team
                if (reaction.emoji.name === businessIntEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(businessInt);
                }
                //for NSCOM team
                if (reaction.emoji.name === NSCOMemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(NSCOM);
                }
            } else {
                return;
            }
        });
    }
}