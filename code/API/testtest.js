var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


function get_additionnal_info(page) {

    request(page, function (error, response, html) {

        if (!error && response.statusCode === 200) {

			//var $ = cheerio.load(html);
		
			var deals = []
            var jsonArray = JSON.parse(response.body)

			console.log(jsonArray.name);
			console.log(jsonArray.address);

	         

        }
    })
}

//Main


	get_additionnal_info('https://m.lafourchette.com/api/restaurant/323811');
  