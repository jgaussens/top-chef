var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var str = '[';



function get_write_deal(href){
const config = {
	'uri': href,
	'headers':{
		'cookie': 'datadome = AHrlqAAAAAMAxcgu_HVh7GAALtotww=='
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

					
			    	str = '\n{"nom" : "'+name+'", "promo" : "'+promo+'", "href" : "'+href+'", "addr" : "'+addr+'"},';
					//console.log(href);
					fs.appendFile('./deals_mobile.json', str);
			    
			    }
			}
	   		
					
		}
		
	});
	
	
}


//read the href in our text file to get promotions from mobile website

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('all_href_Lafourchette.txt')
});

lineReader.on('line', function (line) {
	
	var page = 'https://m.lafourchette.com/fr_FR'.concat(line);
	
	get_write_deal(page);
  
});

