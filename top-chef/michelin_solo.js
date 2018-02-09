var request = require('request');
var cheerio = require('cheerio');


var parsedResults = [];
var hrefResults = []

page = 'https://restaurant.michelin.fr'.concat('/28u6ql7/le-jardin-des-remparts-beaune');
request(page, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    
    	var addr_Zip = $('.addressfield-container-inline .postal-code').first().text();;

	    
	    var title = $('.poi_intro-display-title').text();
		console.log(title);
		console.log(addr_Zip);
	
  }
});


//modifier pour choper une substr de fin du nom du resto pour choper seulement la fin du href (pour l'adresse)

