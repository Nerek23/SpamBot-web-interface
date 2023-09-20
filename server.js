const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mineflayer = require('mineflayer');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let botConfig = {
  host: 'localhost',
  username: '',
  port: 25565,
  version: '1.8.9'
};

let bot = null;

function startBot() {
  bot = mineflayer.createBot({
    host: botConfig.host,
    port: botConfig.port,
    username: botConfig.username,
    version: botConfig.version,
  });

  bot.on('chat', (username, message) => {
    if (username !== bot.username) {
      bot.chat('dsd');
    }
  });
}

app.get('/', (req, res) => {
  res.render('index', { botConfig });
});

app.post('/', (req, res) => {
  const { host, username, port, version } = req.body;

  botConfig = {
    host,
    username,
    port,
    version
  };

  if (bot) {
    bot.end();
  }

  startBot(); 

  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
