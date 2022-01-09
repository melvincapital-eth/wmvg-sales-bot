import Discord, { MessageEmbed, Intents } from 'discord.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES],
});
const discordBotToken = process.env.TOKEN;
const discordChannelId = process.env.CHANNEL;

async function discordSetup() {
  return new Promise((resolve, reject) => {
    client.login(discordBotToken);
    client.on("ready", async () => {
      const channel = await client.channels.fetch(discordChannelId);
      resolve(channel);
    });
  });
}

async function wmvgSalesBot() {

  const channel = await discordSetup(
    discordBotToken,
    discordChannelId
  );

  const assetName = 'Where My Vans Go #1';

  const message = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${assetName}`)
	.setURL('https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/71349417930267003648058267821921373972951788320258492784107927347709150756865')
	.setDescription('Sold to person')
	.setThumbnail('https://lh3.googleusercontent.com/DDK84FSw8ct5oEJIqi46IuMONYeh0fSWdOIqHlQvfGQrbvvXzxyxxyQISyTLzVvjpqMRAB_68GoGAJMEGiGwclnxSfnpqx2PQOrQjR8=w600')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://lh3.googleusercontent.com/DDK84FSw8ct5oEJIqi46IuMONYeh0fSWdOIqHlQvfGQrbvvXzxyxxyQISyTLzVvjpqMRAB_68GoGAJMEGiGwclnxSfnpqx2PQOrQjR8=w600')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


  await channel.send({ embeds: [message] })
}

wmvgSalesBot();

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
  //call wmvg sales bot here, pass in message
  //.then(json => console.log(json))
  //.catch(err => console.error('error:' + err));