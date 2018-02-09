var request = require('request');
var cheerio = require('cheerio');
console.log("début");
var cnt=0;


var fs = require('fs');
var maMap = new Map();
for (i = 1; i<35; i++){
	//console.log(i);
	page = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin'.concat('/page-',i);
	request(page, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    var $ = cheerio.load(html);
		    restaurantsByPage = $('div[attr-gtm-type="poi"]');
		    hrefByPage = $('a[class="poi-card-link"]');
		    for (j = 0; j < restaurantsByPage.length; j++) { 
				    var href = hrefByPage[j].attribs['href'];
				    
				    
				    var page2 = 'https://restaurant.michelin.fr'.concat(href);
				    //console.log(page2);
				    request(page2, function (error, response, html) {
						  if (!error && response.statusCode == 200) {
						    var sel = cheerio.load(html);
						    	
						    	var title = sel('.poi_intro-display-title').text();
						    	var addr_Zip = sel('.addressfield-container-inline .postal-code').first().text();
							    
							    console.log("'"+title + "'" + " : " + "'" +  addr_Zip + "',");
							
						  }
						});

			    	
		    	cnt += 1;
			}
		
	  }
	    
	});
}
