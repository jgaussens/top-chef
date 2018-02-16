var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
//remark: 2 italian restaurants were added to the href because of the zip code. removed them by hand

var str = '[';

function get_write_deal(href){


	request(href, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	  
			var $ = cheerio.load(html);
			
			specialOffer = $('.saleType-title'); //promo actuelle
			
			if (specialOffer.length == 0){
			    console.log("");
			}
			else{
			
			    for (i = 0; i < specialOffer.length; i++){
			    
			    	name = $('.restaurantSummary-name').text();
			    	promo = specialOffer.eq(i).text();
			    
			    	str = '\n{"nom" : "'+name+'", "promo" : "'+promo+'", "href" : "'+href+'"},';
					//console.log(href);
					fs.appendFile('all_current_promos.json', str);
			    
			    }
			}
	   		
					
		}
		
	});
	
	
}


//read the href in our text file to 

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('all_href_Lafourchette.txt')
});

lineReader.on('line', function (line) {
	
	var page = 'https://www.lafourchette.com'.concat(line);
	
	get_write_deal(page);
  
});

//fs.appendFile('all_current_promos.json', '\n ]');

/*
fs.readFile('restaurants.json', 'utf8', function (err,data) {
  data = JSON.parse(data);
  	for(var i = 0; i < data.length; i++) {
	    
	    var restaurantName = data[i].nom
		var zipCode = data[i].zip
		
		var page = 'https://www.lafourchette.com/search-refine/'.concat(restaurantName);
		
		getHref(page, zipCode);
		
		
	}
	fs.appendFile('href_Lafourchette.txt', '\n' ]);
});*/