var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

//get again the name and address of the restaurant that have deals(optionnal)
function get_basic_restaurant_info(page) {

    request(page, function (error, response, html) {

        if (!error && response.statusCode === 200) {
		
            var jsonArray = JSON.parse(response.body)

	         if (typeof jsonArray.name != 'undefined'){
				
	         	fs.appendFile('./info_restaurants.json',
	         		'{ "id_restaurant": '
	                + JSON.stringify(jsonArray.id)
	                + ', "name": '
	                + JSON.stringify(jsonArray.name)
	                + ', "address": '
	                + JSON.stringify(jsonArray.address)
	                + '},\n')
                
            }

        }
    })
}


//get a deal from a page using the API
function getDeal_Api(page, id) {

    request(page, function (error, response, html) {

        if (!error && response.statusCode === 200) {

		
			var deals = []
            var jsonArray = JSON.parse(response.body)

            for(j = 0; j < jsonArray.length; j++) {
                if (jsonArray[j].is_special_offer) {
                    deals.push(jsonArray[j])
                }
            }
                  
            if (deals.length > 0){
           			
	            fs.appendFile('./deals_api.json',
	                '{ "id_restaurant": "'
	                + id + '"'
	                + ', "deals": '
	                + JSON.stringify(deals)
	                + '},\n')
                
            }

        } else {
            console.log("error" + page);
        }
    })
}



var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('all_id_lafourchette.txt')
});


//We parse all the id's of our lafourchette - michelin restaurants to get all their current deals if exist.
lineReader.on('line', function (line) {
	
	var page = 'https://m.lafourchette.com/api/restaurant/'.concat(line)+'/sale-type';
	getDeal_Api(page, line);

});


//get additionnal info
lineReader.on('line', function (line) {
	
	var page2 = 'https://m.lafourchette.com/api/restaurant/'.concat(line);
	get_basic_restaurant_info(page2);
  
});
