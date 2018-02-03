var request = require('request');
var cheerio = require('cheerio');

/*
Some observations:


It seems that oftenly, several restaurants appears in the search requests on lafourchette when we search a michelin-restaurant's name. 
So i guess we should get on michelin also the address of the restaurants (at least the zipcode).
But this zipcode, on the michelin website is always written on the page of the restaurant itself. Isn't it risky to query 604 pages in order to get the zipcode? I guess we should be banned fast after several tests if we launch that much query. Am I right or is it safe?

Another alternative would be: <a href> for each restaurant seems to be $nameOfRestaurant-nameofcity$ :> going that way for the moment

*/

/* 
	How a deal is represented on lafourchette:
	<div class="saleType saleType--specialOffer" data-category-type>
		<h3 class="saleType-title">-30% sur la carte</h3>
	
	document.querySelectorAll('.saleType--specialOffer');
	
	//si length = 0 = pas d'offre 
*/


//Test request pour savoir si offer sur un restaurant precis => fonctionne
/* 

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

*/


/* Idée:

1. rechercher le restaurant avec le nom du michelin
2. Analyser la <li> des résultats:

	Si aucune promo dans toute les li => pas de promo !
	
	else:

		a. regarder l'adresse en question (champ texte, analyser mot par mot pour trouver le nom de la ville"
		b. comparer avec le href trouvé sur michelin (type nomDuRestaurant-nomVille) (sauf dans le cas de villes avec arondissements 				   (nomdurestaurant-ville-arrondissement))
		c. regarder .resultItem-saleType pour la li en question.
			Si existe => prendre le champ promo
			else => Pas de promo !
			
		later:
		sélectionner les horaires des promotions en requêtant la page 'https://www.lafourchette.com/restaurant/' + id-href
		
		
		peut être faire v0 en prenant toujours le premier resultat quitte à avoir tort dans certains cas 

*/

//Test pour la recherche sur lafourchette avec plusieurs résultats: avec et sans promotions

//test v0


var page = 'https://www.lafourchette.com/search-refine/papilla';
request(page, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    
    specialOffer = $('.list-unstyled .resultItem-saleType--specialOffer'); //tableau contenant toutes les promo sur 																									cette page 
    
    length = specialOffer.length
    if (length == 0){
	    console.log("No offer for this restaurant");
    }
    else{
		//gros bloc else a b c du dessus
		allResults = $('.resultContainer .list-unstyled .resultItem');

		firstResultOffer = allResults[0]+$('.resultItem-saleType--specialOffer'); //c'est un text et pas un objet. voir comment faire pour l'avoir en objet
		
		//************* pas bon car récupère tout, allResults[0] ne fonctionne pas // ********************
		
		length = firstResultOffer.length;
		
		if (length==0){
			console.log("Aucune offre pour ce restaurant");

		}
		else{
			console.log("Il y a une promotion pour ce restaurant:");
			promo = firstResultOffer+$('outerHTML');
			console.log(promo);
		}

    }
	
  }
    
});




/* v0.5 avec l'histoire des menus speciaux et pas des promotions */
/*

//page = 'https://www.lafourchette.com/search-refine/papilla';
page = 'https://www.lafourchette.com/search-refine/Le%20Corot';
request(page, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    
    specialOffer = $('.list-unstyled .resultItem-saleType--specialOffer'); //tableau contenant toutes les promo sur 																									cette page 
    
    length = specialOffer.length
    if (length == 0){
	    console.log("No offer for this restaurant");
    }
    else{
		//gros bloc else a b c du dessus
		allResults = $('.resultContainer .list-unstyled .resultItem');

		firstResultOffer = allResults[0]+$('.resultItem-saleType--specialOffer'); //c'est un text et pas un objet. voir comment faire pour l'avoir en objet
		console.log(allResults.first());
		//resultItem-saleType--event = menu special (exemple: saint valentin
		
		//console.log(firstResultOffer);
		length = firstResultOffer.length;
		
		if (length==0){
			firstResultOffer = allResults[0]+$('.resultItem-saleType--event');
			length = firstResultOffer.length;
			if (length==0){
				console.log("Aucune offre pour ce restaurant");
			}
			else{
				console.log("Un menu spécial est proposé pour ce restaurant");
				console.log(firstResultOffer);
			}
		}
		else{
			console.log("Il y a une promotion pour ce restaurant:");
			promo = firstResultOffer+$('outerHTML');
			console.log(promo);
		}

    }
	
  }
    
});

/*

//v1 Later


page = 'https://www.lafourchette.com/search-refine/L'Arbre';
request(page, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    
    specialOffer = $('.list-unstyled .resultItem-saleType--specialOffer'); //tableau contenant toutes les promo sur 																									cette page 
    
    length = specialOffer.length
    if (length == 0){
	    console.log("No offer for this restaurant");
    }
    else{
		//gros bloc else a b c du dessus
		addr = document.querySelectorAll('.list-unstyled .resultItem-address');
		if addr[0]
		


    }
	
  }
    
});



*/