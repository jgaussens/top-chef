var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var str = '[';


//get the deals from a given page of a lafourchette restaurant
function get_write_deal(href){

const config = {
	'uri': href,
	'headers':{
		'cookie': 'AHrlqAAAAAMA7Q-kVP-96lkAw4TaJA=='
	}
	
}

	request(config, function (error, response, html) {
	console.log(response.statusCode);
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
			    	var addr = $('.restaurantSummary-address').first().text();

					
			    	str = '\n{"nom" : "'+name+'", "promo" : "'+promo.replace('"', '')+'", "href" : "'+href+'", "addr" : "'+addr+'"},';
					//console.log(href);
					fs.appendFile('promos_scrap.json', str);
			    
			    }
			}
	   		
					
		}
		
	});
	
	
}


//read the href in our text file to get all the deals in web mode
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('all_href_Lafourchette.txt')
});


lineReader.on('line', function (line) {
	var page = 'https://www.lafourchette.com'.concat(line);
	get_write_deal(page);
  
});