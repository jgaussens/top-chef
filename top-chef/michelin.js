var request = require('request');
var cheerio = require('cheerio');

request('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var parsedResults = [];
    restaurantsByPage = $('div[attr-gtm-type="poi"]');
    console.log(restaurantsByPage);
    }
});

//document.querySelectorAll('div[attr-gtm-type="poi"]')
//attr-gtm-title
//restaurantsByPage.length = 18

