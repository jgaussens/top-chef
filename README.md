// All the code is in the ‘code/’ folder


/*** Run the React client side to display the deals (from file because of the anti bot): ***/
	
	cd code/react/
	npm install
	npm start
	go to localhost:3000


* Most of the of the client side code is contained in the /code/react/src/Home.js file (if you want to see the code)


##########################################


/*** Run the Server Side ***/


* Installation (if modules not already installed):

	npm install (from the first folder, which contains all the project)

————————————————————————————————————————————


* Get all the stared restaurants from michelin:

	cd code/michelin/
	node michelin.js
	open michelin_restaurants.json (in the same folder) to see the results 


————————————————————————————————————————————


* Get all the deals (API Mode):

	cd code/lafourchette_API/
	node lafourchette.js
	open the deals_api.json file and the info_restaurants.json file (infos about restaurants) in the same folder


————————————————————————————————————————————

* Get all the deals (Scraping web mode): [Warning: You should be blocked using this method]

	cd code/lafourchette_Scrap/
	node lafourchette_Web.js
	if you are not blocked (403), open the promos_scrap.json file (in the same folder)


————————————————————————————————————————————

* Get all the deals (Scraping mobile mode): [Warning: You should be blocked using this method]

	cd code/lafourchette_Scrap/
	node lafourchette_mobile.js
	if you are not blocked (403), open the deals_mobile.json file (in the same folder)




/*** Additional informations ***/


If you want to get in details of the server side of the code, here is what I did:

During the major time of the workshop, I almost only worked in scraping (web mode).

When we had the issues with the anti-bot from datadome, I redid all the process to get the informations we needed, but with the API.

I also did a small script that gets deals with the mobile scraping mode.
This allowed me to see all the different parts of the workshop.

The folder /code/jsonFiles_static contains the several jsons I got from michelin and lafourchette, but with pretreatments, to avoid issues when merging + displaying them from the React Client-Side.

The only issue I have is to display the number of stars from a restaurant, when merging all the jsons from react.
 


