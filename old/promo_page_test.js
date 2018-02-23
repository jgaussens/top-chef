var request = require('request');
var cheerio = require('cheerio');


var page = 'https://www.lafourchette.com/restaurant/shang-palace-shangri-la-hotel-paris/8977'

request(page, function (error, response, html) {
console.log(response.statusCode);
  if (!error && response.statusCode == 200) {
  
  		console.log("dddd");
		var $ = cheerio.load(html);
		
		specialOffer = $('.saleType-title'); //promo actuelle
		name = $('.restaurantSummary-name');
		
		if (specialOffer.length == 0){
		    console.log("daz");
		}
		else{
		
			var addr = $('.restaurantSummary-address');
			console.log(addr.first().text());
		    for (i = 0; i < specialOffer.length; i++){
		    	console.log(specialOffer.eq(i).text()); 
		    	console.log(name.text());
		    
		    }
		}
   		
				
	}
	
	
});