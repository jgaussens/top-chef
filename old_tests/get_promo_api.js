var request = require('request');
var cheerio = require('cheerio');


//var page = 'https://www.lafourchette.com/restaurant/shang-palace-shangri-la-hotel-paris/8977';

//var page = 'https://m.lafourchette.com/fr_FR/restaurant/cafe-restaurant-des-3-rois/368057';

var page = 'https://m.lafourchette.com/api/restaurant/250/sale-type';

const config = {
	'uri': page,
	'headers':{
		'cookie': 'datadome = AHrlqAAAAAMAxcgu_HVh7GAALtotww=='
	}
	
}

request(config, function (error, response, html) {
console.log(response.statusCode);
  if (!error && response.statusCode == 200) {
  
  		console.log("dddd");
		var $ = cheerio.load(html);
		
		console.log($);
				
	}
	
	
});