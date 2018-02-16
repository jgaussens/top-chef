var request = require('request');
var cheerio = require('cheerio');


var page = 'https://www.lafourchette.com/restaurant/langolo-ristorante-le-rotonde/349677'

request(page, function (error, response, html) {
  if (!error && response.statusCode == 200) {
  
		var $ = cheerio.load(html);
		
		specialOffer = $('.saleType-title'); //promo actuelle
		name = $('.restaurantSummary-name');
		
		if (specialOffer.length == 0){
		    console.log("daz");
		}
		else{
		
		    for (i = 0; i < specialOffer.length; i++){
		    	console.log(specialOffer.eq(i).text()); 
		    	console.log(name.text());
		    
		    }
		}
   		
				
	}
	
});