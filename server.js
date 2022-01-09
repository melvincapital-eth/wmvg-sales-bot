import Discord from 'discord.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const Intents = Discord.Intents;

dotenv.config();

//Create Client
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
})

//Fetch Where My Vans Go Collection
const baseUrl = 'https://api.opensea.io/api/v1/events?only_opensea=false&offset=0&limit=20';
const params = new URLSearchParams({
  only_opensesa : false,
  offset: 0,
  limit: 10,
  collection_slug: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
  account_address: '0x9dbe56e65961146525d796bdc008225bd5915a4f',
  event_type: 'created'
});

const options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-KEY': '' }};

const url = `${baseUrl}?${params.toString()}`;

fetch(baseUrl, options)
  .then(res => console.log(res))
  //.then(json => console.log(json))
  //.catch(err => console.error('error:' + err));


client.on("ready", () => {
  console.log('The bot is ready');
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
  if (msg.content === "bing") {
    msg.reply("bong");
  }
})

client.login(process.env.TOKEN)