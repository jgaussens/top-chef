/*Request all michelin starred restaurants and get their name, zipcode and number of Stars*/

var request = require('request');
var cheerio = require('cheerio');
var cnt=0;


var fs = require('fs');
var maMap = new Map();

for (i = 1; i<35; i++){
	page = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin'.concat('/page-',i);
	request(page, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    var $ = cheerio.load(html);
		    restaurantsByPage = $('div[attr-gtm-type="poi"]');
		    hrefByPage = $('a[class="poi-card-link"]');
		    for (j = 0; j < restaurantsByPage.length; j++) { 
				    var href = hrefByPage[j].attribs['href'];
				    var page2 = 'https://restaurant.michelin.fr'.concat(href);
				    request(page2, function (error, response, html) {
						  if (!error && response.statusCode == 200) {
						    var sel = cheerio.load(html);
						    	
						    	var title = sel('.poi_intro-display-title').text();
						    	var addr_Zip = sel('.addressfield-container-inline .postal-code').first().text();
						    	
						    	var stars = sel('.michelin-poi-distinctions-list .content-wrapper').text().charAt(0);

								var str = '{' + '"nom" : ' + '"' + stringify(title.substr(7, title.length - 5)) + '",' + ' "zip" : "' + addr_Zip + '", ' + '"Stars" : ' + '"' + stars + '"},\n';

                        fs.appendFile('michelin_restaurants.json', str)
							    
						  }
						});	
		    	cnt += 1;
			}		
	  }	    
	});
}

