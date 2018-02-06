var request = require('request');
var cheerio = require('cheerio');

/*
Some observations:

doc cheerio: https://cheerio.js.org/

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
	
	//si lenghtCalc = 0 = pas d'offre 
*/


//Test request pour savoir si offer sur un restaurant precis => fonctionne
/* 

//page = 'https://www.lafourchette.com/restaurant/in-vino-veritas/5870';
page = 'https://www.lafourchette.com/restaurant/le-jules-verne/282745';
request(page, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    specialOffer = $('.saleType--specialOffer');
    lenghtCalc = specialOffer.length
    if (lenghtCalc == 0){
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


//var page = 'https://www.lafourchette.com/search-refine/papilla'; //test 1 offre only
//var page = 'https://www.lafourchette.com/search-refine/matsuri'; //test plusieurs offres
var page = 'https://www.lafourchette.com/search-refine/Le%20Corot';
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
		var firstResultOffer = (allResults.first().find('.resultItem-saleType--specialOffer'));


		var href = $('.resultItem-avatar id href').eq(0).children().eq(0);
		
		//hrefref[0].children[0].href => fonctionne dans la console

		
		lenghtCalc = firstResultOffer.length //fonctionne
		//console.log(lenghtCalc);
				
		if (lenghtCalc==0){
		
			firstResultOffer = $('.resultItem-saleType--event').first();
			
			//console.log(firstResultOffer);
			
			lenghtCalc = firstResultOffer.length;
			
			if (lenghtCalc==0){ 
				console.log("Zero offer for this restaurant");
			}
			else{
			
				var specialEvent = $('.resultItem-saleType--event').children().first().text();
				
				
				console.log("No discount for this restaurant but there is a special event:");
				
				console.log(specialEvent);
				
				
				
				var addresses = $('.resultItem-address');
				
				
				var firstAddressString = addresses.first().contents().text(); //adresse du premier resultat (fonctionne);
				
				console.log(firstAddressString);
				
				var toSearch = firstAddressString.search("Ville-d'Avray"); // if returns -1 => no string
				
				console.log(toSearch);
				
			
				//console.log(links);
				
				//resultItem-address
				
				/*
				
					var addresses = [];
				$('.resultItem-address').each( (index, value) => {
				   var addr = $(value).attr('href');
				   addresses.push({"link": addr});
				});
				   
				   
				console.log(links);
				
				
				
				$('.resultItem-avatar id href').each(function(index, elem) {
					console.log($(this).attr('href'));
				});
								//console.log(firstResultOffer+$('innerText'));
								
								*/
			}

		}
		else{
			console.log("Il y a une promotion pour ce restaurant:");
			var promo = $('.resultItem-saleType--specialOffer').children().first().text();
			console.log(promo);
		}

    }
	
  }
    
});


/*


//next: pour la recherche

Requêter toutes les pages de la requête (foreach in allresults.length : get Id href + request lafourchette/idhref {get ville, comparer avec la notre (pour l'instant en dur next avec le fichier récupéré michelin)

*/