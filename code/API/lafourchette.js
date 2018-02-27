var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

//to get again the name and address of the restaurant that have deals(optionnal)
function get_basic_restaurant_info(page) {

    request(page, function (error, response, html) {

        if (!error && response.statusCode === 200) {

			//var $ = cheerio.load(html);
		
            var jsonArray = JSON.parse(response.body)

			console.log(jsonArray.name);
	         if (typeof jsonArray.name != 'undefined'){
				 console.log("ok");
				
	         	fs.appendFile('info_restaurants.json',
	         		'{ "id": '
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


function getDeal_Api(page, id) {

	
    request(page, function (error, response, html) {

        if (!error && response.statusCode === 200) {

			//var $ = cheerio.load(html);
		
			var deals = []
            var jsonArray = JSON.parse(response.body)



            for(j = 0; j < jsonArray.length; j++) {
                if (jsonArray[j].is_special_offer) {
                    deals.push(jsonArray[j])
                }
            }
            
            
            if (deals.length > 0){
           
				
				
	            fs.appendFile('deals_api.json',
	                '{ "id": "'
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

//Main

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('all_id_lafourchette.txt')
});

lineReader.on('line', function (line) {
	
	var page = 'https://m.lafourchette.com/api/restaurant/'.concat(line)+'/sale-type';
	getDeal_Api(page, line);

});


lineReader.on('line', function (line) {
	
	
	var page2 = 'https://m.lafourchette.com/api/restaurant/'.concat(line);
	get_basic_restaurant_info(page2);
  
});
