const CovidSources = require('./covidsource').CovidSources
const sources = new CovidSources()
const sourceRefreshSeconds = 60

let latestCachedData = []

async function loadSourceData(){
  const latestData = await sources.loadAll()

  latestCachedData = latestData
}

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === config.prefix + "cases") {
    latestCachedData.forEach(location => {
      msg.reply('There are '+location.total+' cases in '+location.name+' as of '+location.lastUpdated);
    })

    console.log(latestCachedData)
  }
});

client.login(config.bot_token);


// 1 minute event loop for covidsource refresh
setTimeout(function doSomething() {
  console.log('Refreshing COVID source data')
  loadSourceData()
  setTimeout(doSomething, sourceRefreshSeconds * 1000)
}, sourceRefreshSeconds * 1000);

// Initial load
loadSourceData()

module.exports = {latestCachedData}





