var request = require('request');
var cheerio = require('cheerio');

var cnt=0;
var parsedResults = [];
for (i = 1; i<35; i++){
	page = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin'.concat('/page-',i);
	request(page, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    var $ = cheerio.load(html);
	    restaurantsByPage = $('div[attr-gtm-type="poi"]');
		    for (j = 0; j < restaurantsByPage.length; j++) { 
			    	parsedResults[cnt] = restaurantsByPage[j].attribs['attr-gtm-title'];
			    	console.log(parsedResults[cnt]);
		    	cnt += 1;
			}
		
	  }
	    
	});
}


