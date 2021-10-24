const Discord = require("discord.js");
const intents = new Discord.Intents([
    "GUILDS", 
    "GUILD_MEMBERS", 
    "GUILD_MESSAGE_REACTIONS", 
    "GUILD_MESSAGES", 
    "GUILD_EMOJIS_AND_STICKERS"
]);
const bot = new Discord.Client({intents: intents});

const moment = require("moment");

const config = require("./json/config.json");
const i = require("./json/ids.json");
const message = require("./json/message.json");

bot.on("ready", () => {

    let ChannelVerifi = bot.channels.cache.get(i.channel);
    let guild = bot.guilds.cache.get(i.server);
    let role = guild.roles.cache.get(i.role);

    const verifica = new Discord.MessageEmbed()
    verifica.setTitle(message.verify.Title)
    verifica.setColor(message.verify.Color)
    verifica.setDescription(message.verify.Description)
    verifica.setAuthor(message.verify.Author_Name, message.verify.Author_Icon)
    verifica.setFooter(message.verify.Footer_Text, message.verify.Footer_Icon)

    ChannelVerifi.send({embeds: [verifica]})
    .then(msg => { 

        msg.react("☑️").then(m => {
                                                                                
            const ReacFilter = (reaction, user) => reaction.emoji.name === `☑️` && user.id != bot.user.id ;
            const Colee = msg.createReactionCollector({filter: ReacFilter})

            Colee.on("collect", (reaction, user) => {
                
                let member = guild.members.cache.get(`${user.id}`);
                
                member.roles.add(role).then(a => {
                    console.log(`Role:${role.name}\nAdd in ${member.user.tag}\nDate:${moment(moment.now())}\n`); 
                }).catch(err => { return console.log(err) })
            })
        })
    }).catch(err => { 
        return console.log(err);
    });

    console.log(`\nSystem online.`);
    console.log(`Logged:${bot.user.tag}(${bot.user.id})\nCreated:${bot.user.createdAt}\n\n`);
   
})

bot.login(config.token)
