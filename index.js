const
  fetch = require('node-fetch'),
  striptags = require('striptags'),
  Discord = require('discord.io'),
  bot = new Discord.Client({
  token: require('./auth.json').token,
    autorun: true
  });

bot.on('message', (user, userID, channelID, message, evt) => {
  if(userID !=bot.id){
    let args = message.split(' '), cmd = args[1];
    if(args[0] == '!') {
      args.splice(0, 2);
      console.log(args);
      switch (cmd) {
        case 'moi':
        bot.sendMessage({to: channelID, message: 'moro'}, ()=>{})

          break;
        case 'Marco':
        bot.sendMessage({to: channelID, message:'Polo'}, ()=>{})
        break;

        case 'wiki':
        fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${args.join('%20')}&utf8=&format=json`)
        .then(res => res.json())
        .then(data => {
        if(data.query.searchinfo.totalhits > 0)  {
          console.log(data.query.search)
          const we = {title: 'wikisearch', fields: []}

          for(let i = 0; i<data.query.search.length && i<50; i++){
            we.fields.push({
              name: data.query.search[i].title,
              value: striptags(data.query.search[i].snippet) + '\n' +
              'https://en.wikipedia.org/wiki?curid=' +
               data.query.search[i].pageid
            })
          }
          bot.sendMessage({to: channelID, message:'', embed:we}, ()=>{})
        }
        })
        default:

      }
    }

  }
})
  bot.on('ready',evt => {console.log(bot.username)});
bot.on('disconnect',(err, code) =>{
  console.log(err, code);
  setTimeout(bot.connect, 5000)
});
