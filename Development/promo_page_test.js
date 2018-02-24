var request = require('request');
var cheerio = require('cheerio');


//var page = 'https://www.lafourchette.com/restaurant/shang-palace-shangri-la-hotel-paris/8977'

var page = 'https://m.lafourchette.com/fr_FR/restaurant/cafe-restaurant-des-3-rois/368057'

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
		
		specialOffer = $('.labelized-content p'); //promo actuelle
		name = $('.restaurantSummary-name');
		
		console.log(specialOffer.first());
		if (specialOffer.length == 0){
		    console.log("daz");
		}
		else{
		
			var addr = $('.restaurantSummary-address');
			console.log(addr.first().text());
		    for (i = 0; i < specialOffer.length; i++){
		    	//console.log(specialOffer.eq(i).text()); 
		    	console.log(specialOffer.first().text()); 
		    	console.log(name.text());
		    
		    }
		}
   		
				
	}
	
	
});