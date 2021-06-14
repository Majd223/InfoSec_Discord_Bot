const Discord = require('discord.js');
const chalk = require('chalk');
//add partials here for event handeling, in this case its reaction roles event.
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

//set the prefix command for the bot.
const prefix = '`';

//get the bot token/channel IDs from ServerIDs.json
var IDs = require("./ServerIDs.json");

//Search the folder "commands" that contains files for the bot commands
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
}

//green message coloring for the console.
function greenMessage(text) {
    console.log(chalk.green(text) + "\n");
}

//Output a message when the bot is ready and online.
client.on('ready', () => {
    greenMessage('Infosec bot is online!');
});

//command test.
client.on('message', message => {
    
    //if the message doesnt start with the prefix then ignore it.
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    //do a slice to be able to do multiple command, for example *check calender
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //if the command is ... , then execute ...

    //test the command stonks
    if(command === 'stonks') {
        client.commands.get('stonks').execute(message, args);

    //call the reaction roles message.
    }else if (command === 'rr') {
        client.commands.get('teams').execute(message, args, Discord, client);
        client.commands.get('disciplines').execute(message, args, Discord, client);
        client.commands.get('years').execute(message, args, Discord, client);
        client.commands.get('CTF').execute(message, args, Discord, client);
    }
});

//Welcome new people.
client.on('guildMemberAdd', member => {
    //create a const of the channel you want to welcome people in.
    const channel = member.guild.channels.cache.get(IDs.WelcomeChannel);

    //create a const to mention it in the message telling the student to introduce themselves.
    const introduceChannel = member.guild.channels.cache.get(IDs.introduceYourself);
    if (!channel) return;

    //Welcome Message.
    channel.send(`Welcome to the server, ${member}, please introduce yourself in ${introduceChannel}`);
});

//This line should stay the last line, it auth the bot with the discord application.
client.login(IDs.token); 