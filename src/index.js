require('dotenv').config()
const {Client,IntentsBitField} = require("discord.js");

const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds ,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages ,
        IntentsBitField.Flags.MessageContent ,
    ]
})

client.on("ready" , (c)=>{
    console.log(` 🤖 ${c.user.username} At Your Service !!`);
})

client.on("messageCreate" , async (msg)=>{
    let content_box=[];
    content_box=msg.content.split(" ");
    try{
        if((MsgTrigger(content_box)) && msg.mentions.users.first()){

            if(msg.mentions.members.first().id === msg.author.id){
                msg.channel.send(`Why would you ${content_box[1]} yourself ${msg.author.globalName}??`);
                return;
            }

            const json_gif = await fetch(`https://api.otakugifs.xyz/gif?reaction=${content_box[1]}`)
            const gif = await json_gif.json();
            gif.url && msg.channel.send(`${gif.url}`);
        }
    }
    catch(e){
        msg.channel.send(`Try again`);
    }        
})

client.login(process.env.token);

const MsgTrigger=(arr)=>{
    if(arr.length===3 && arr[0].toLowerCase()=="jeffy"){
        return true;
    }
    return false;
}