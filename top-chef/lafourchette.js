var request = require('request');
var cheerio = require('cheerio');

/*
Some observations:


It seems that oftenly, several restaurants appears in the search requests on lafourchette when we search a michelin-restaurant's name. 
So i guess we should get on michelin also the address of the restaurants (at least the zipcode).
But this zipcode, on the michelin website is always written on the page of the restaurant itself. Isn't it risky to query 604 pages in order to get the zipcode? I guess we should be banned fast after several tests if we launch that much query. Am I right or is it safe?

Another alternative would be: <a href> for each restaurant seems to be $nameOfRestaurant-nameofcity$ 

*/

/* 
	How a deal is represented on lafourchette:
	<div class="saleType saleType--specialOffer" data-category-type>
		<h3 class="saleType-title">-30% sur la carte</h3>
	
	document.querySelectorAll('.saleType--specialOffer');
	
	//si length = 0 = pas d'offre 
*/


//Test request pour savoir si offer sur un restaurant precis
//page = 'https://www.lafourchette.com/restaurant/in-vino-veritas/5870';
page = 'https://www.lafourchette.com/restaurant/le-jules-verne/282745';
request(page, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
	    specialOffer = $('.saleType--specialOffer');
	    length = specialOffer.length
	    if (length == 0){
		    console.log("No offer for this restaurant");
	    }
	    else{
		    console.log(specialOffer);
	    }
	
  }
    
});

//Test pour la recherche sur lafourchette