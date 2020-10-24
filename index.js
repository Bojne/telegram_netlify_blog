//var fs = require('fs');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const TeleBot = require('telebot');
const bot = new TeleBot({
	token: process.env.tg_api_key // Required. Telegram Bot API token.
});

var obj = {
	table: []
};

bot.start();

bot.on('sticker', (msg) => {
	return msg.reply.sticker('http://i.imgur.com/VRYdhuD.png', { asReply: true });
});

bot.on('text', (msg) => {
	writeObj(msg, obj);
});

bot.on(/(show\s)?dog*/, (msg) => {
	console.log('Dog Requested');

	return msg.reply.photo(getRandomImage());
});

bot.start();

// function to perform a get request
function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open('GET', theUrl, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

// function to get a random image
function getRandomImage() {
	// get the json from the server
	var json = httpGet('https://dog.ceo/api/breed/retriever/golden/images/random');

	// decode the json into an array
	var array = JSON.parse(json);

	// get the image url from the array
	var url = array.message;
	console.log(url);

	return url;
}

function writeObj(msg, obj) {
	obj.table.push({ message: msg.text, time: msg.date });
	console.log('New Message:', msg.text);
	//var json = JSON.stringify(obj);
	//fs.writeFile('myjsonfile.json', json, 'utf8', callback);
}
