const TeleBot = require('telebot');
var fs = require('fs');

const bot = new TeleBot({
	token: tg_api_key // Required. Telegram Bot API token.
});

var obj = {
	table: []
};

bot.start();

function writeObj(msg, obj) {
	obj.table.push({ message: msg.text, time: msg.date });
	console.log(JSON.stringify(obj));
	var json = JSON.stringify(obj);
	fs.writeFile('myjsonfile.json', json, 'utf8', callback);
}

bot.on('sticker', (msg) => {
	return msg.reply.sticker('http://i.imgur.com/VRYdhuD.png', { asReply: true });
});

bot.on('text', (msg) => {
	writeObj(msg, obj);
});

bot.on(/(show\s)?kitty*/, (msg) => {
	console.log('Kitty Requested');
	return msg.reply.photo('http://thecatapi.com/api/images/get');
});

bot.start();
