var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


function getHref(search_page, zipCode){
	
	request(search_page, function (error, response, html) {
	console.log(response.statusCode);
			if (!error && response.statusCode == 200) {
				
				var $ = cheerio.load(html);
				
				var allResults = $('.resultContainer .list-unstyled .resultItem');//good
	
				//verify zipCode:
				
				for (j = 0; j < allResults.length; j++){
				
					currAddr = allResults.eq(j).find('.resultItem-address').text();
	
					//console.log(currAddr);
					//console.log(zipCode);
				
					var toSearch = currAddr.search(zipCode); // if returns -1 => no string
	

						if (toSearch == -1){
							continue;
						}
						else{
						
							var href = $('.resultItem-name a').attr('href');
							fs.appendFile('href_Lafourchette.txt', href + '\n');
						
						}
						
				}

			
			}
			
	});
}


fs.readFile('../jsonFiles/michelin_restaurants(pretrated).json', 'utf8', function (err,data) {
  data = JSON.parse(data);
  	for(var i = 0; i < data.length; i++) {
	    
	    var restaurantName = data[i].nom
		var zipCode = data[i].zip
		
		var page = 'https://www.lafourchette.com/search-refine/'.concat(restaurantName);
		
		getHref(page, zipCode);
		
		
	}
});