var request = require('request');
var cheerio = require('cheerio');


//var page = 'https://www.lafourchette.com/search-refine/papilla'; //test 1 offre only
//var page = 'https://www.lafourchette.com/search-refine/matsuri'; //test plusieurs offres

var restaurantName = 'matsuri'
var zipCode = '94300';
var page = 'https://www.lafourchette.com/search-refine/'.concat(restaurantName);
request(page, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    
    specialOffer = $('.list-unstyled .resultItem-saleType--specialOffer'); //tableau contenant toutes les promo sur 																									cette page 
    
    lenghtCalc = specialOffer.length
    
    if (lenghtCalc == 0){
	    console.log("No offer for this restaurant");
    }
    else{
    
		//gros bloc else a b c du dessus
		var allResults = $('.resultContainer .list-unstyled .resultItem');//good
		
		var i;
		for (i = 0; i < allResults.length; i++){
			currAddr = allResults.eq(i).find('.resultItem-address').text();
			
			var toSearch = currAddr.search(zipCode); // if returns -1 => no string
				

				if (toSearch == -1){
					console.log("This result wasn't the right-located restaurant.. searching the next ones");
				}
				else{
				
					var offer = (allResults.eq(i).find('.resultItem-saleType--specialOffer'));
					
					lenghtCalc = offer.length //fonctionne
					
					
					if (lenghtCalc==0){
		
						offerFirst = $('.resultItem-saleType--event').first();
						
						lenghtCalc = offerFirst.length;
						
						if (lenghtCalc==0){ 
							console.log("Zero offer for this restaurant");
						}
						else{
		
								var promo = $('.resultItem-saleType--event').eq(i).first().text();
							
								console.log("No discount for this restaurant but there is a special event:");
								
						}
			
					}
					else{								
					
								console.log("Il y a une promotion pour ce restaurant:");
								var promo = $('.resultItem-saleType--specialOffer').eq(i).first().text();

							
					}

					break;

					
				}
					
					

				
				
		}
			
			
	}
		


    }
	
	
	console.log(promo);
  
    
});

