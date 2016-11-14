console.log('the bot is working');

var Twit = require('twit');
var fs=require('fs');
require('dotenv').config(); 

var moodsBuffer=fs.readFileSync('corpora/moods.json');
moods=JSON.parse(moodsBuffer).moods;

var firstNamesBuffer=fs.readFileSync('./corpora/firstNames.json');
firstNames=JSON.parse(firstNamesBuffer).firstNames;

var occupationsBuffer=fs.readFileSync('./corpora/occupations.json');
occupations=JSON.parse(occupationsBuffer).occupations;

var tvshowsBuffer=fs.readFileSync('./corpora/tvshows.json');
tvshows=JSON.parse(tvshowsBuffer).tvshows;

var objectsBuffer=fs.readFileSync('./corpora/objects.json');
objects=JSON.parse(objectsBuffer).objects;


var config={
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token: process.env.access_token,
	access_token_secret: process.env.access_token_secret
};

var T = new Twit(config);

function getRandom(array) {
  var index = Math.floor( Math.random() * array.length)
  return array[index];
}

var options=['mood','name','job','tv','object'];
function tweetthis(){
	var subject= getRandom(options);
	console.log(subject);
	if(subject=='mood'){
		var tweet="Nobody understands how "+getRandom(moods)+" I feel. "
	}else if (subject=='name'){
		var tweet="I've legally changed my name and will only respond to "+getRandom(firstNames)+"."
	}else if (subject=='job'){
		var tweet="Due to my career change, I'm looking into expanding my network to passionate "+getRandom(occupations)+"s. Find me on linked in."
	}else if (subject=='tv'){
		var tweet="Just binge-watched all of "+getRandom(tvshows)+" on Netflix. So Gooood!"
	}else if (subject=='object'){
		var tweet="Found out I'm allergic to "+getRandom(objects)
	};

	T.post('statuses/update', {status: tweet }, function(err, data, response) {
    	console.log(data)
  	});
}



setInterval(tweetthis, 1000*60*10);
tweetthis();