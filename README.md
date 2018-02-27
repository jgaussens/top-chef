/*** Run the React client side to display the deals (from file because of the anti bot): ***/

	npm install 
	npm start
	go to localhost:3000




##########################################


/*** Run the Server Side ***/


* Installation:

	npm install cheerio request



* Get all the stared restaurants from michelin:

	cd code
	node michelin.js
	open list_restaurants_V2.json (in the same folder) 


* Get all the deals (API Mode):

	cd code/API/
	node lafourchette_api.js
	open the deals_api.json file and the info_restaurants.json file


* Get all the deals (Scraping web mode):

	cd code/Scraping/











/*** Additional informations ***/


If you want to get in details of the server side of the code, here is what I did:

During the major time of the workshop, I almost only worked in scraping (web mode).

When we had the issues with the anti-bot from datadome, I redid all the process to get the informations we needed, but with the API.


I also did a small script that gets deals with the mobile scraping mode.
This allowed me to see all the different parts of the workshop.


