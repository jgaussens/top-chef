import React, { Component } from "react";


//all the different jsons that contains informations about restaurants / deals / stars / href 
import promos from './jsonFiles_static/deals_api.json';
import href from './jsonFiles_static/href_lafourchette.json';
import info from './jsonFiles_static/restaurant_addresses.json';
import michelin from './jsonFiles_static/michelin_stars.json';

var dom = "";
 
//create a dom object that combines all the json to combine deals, stars and the href of the restaurants to be able to click on it
function merge_all_restaurant_infos(){
	for(var i = 0; i < promos.length; i++) {
	    
	    //get address and name of restaurants
	    for (var j = 0; j < info.length; j++){
		    if (info[j].id == promos[i].id_restaurant){
		    	var restaurant_name = info[j].name;
		    	var addr_locality = info[j].address.address_locality;
		    	var addr_zip = info[j].address.postal_code;
		    	console.log(restaurant_name);
		    }
	    }
	    
	    //get number of stars of restaurants (got from michelin) (doesn't work all the time because of the names which are sometimes different)
	    for (var k = 0; k < michelin.length; k++){
		    if (restaurant_name.search(michelin[k].name) != -1){
		    	var stars = michelin[k].stars;
		    }
		    else{
			    var stars = '';
		    }
	    }
	    
	    //put all informations in the "dom" string
	    dom += '<ul><a href="'
	    for (var l = 0; l < href.length; l++){
		    if (href[l].id_restaurant == promos[i].id_restaurant){
			    dom += 'https://www.lafourchette.com/restaurant/' + href[l].href + '/' + promos[i].id_restaurant + '">'
			    + restaurant_name + ' - ' + addr_locality + ' - ' + addr_zip + ' - ' + stars + '</a>';
		    }
	    }
	    
	    //add the deals titles
	    for (var m = 0; m < promos[i].deals.length; m++){
		    dom += "\n<li>"+promos[i].deals[m].title+"</li>\n";
	    }
	    dom += "</ul>\n";
	} 
}

merge_all_restaurant_infos();

//print the deals
class Home extends Component {
  render() {
    return ( <div dangerouslySetInnerHTML={{ __html: dom }} />

    );
  }
}
 
export default Home;

