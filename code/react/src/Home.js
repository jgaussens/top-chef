import React, { Component } from "react";
 
import data from './promos.json';
import promos from './jsonFiles/all_deals_API.json';
import href from './jsonFiles/href_lafourchette.json';
import info from './jsonFiles/info_restaurants.json';
import michelin from './jsonFiles/restaurants.json';

var dom = "";
 
//create a dom object that combines all the json to combine deals, stars and the href of the restaurants to be able to click on it

function merge_all_restaurant_infos(){
	for(var i = 0; i < promos.length; i++) {
	    
	    //get address and name of restaurants
	    for (var j = 0; j < info.length; j++){
		    if (info[j].id == promos[i].id_restaurant){
		    	var restaurant_name = info[j].name;
		    	var addr = info[j].address.address_locality;
		    	console.log(restaurant_name);
		    	console.log(addr);
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
	    
	    
	    dom += '<ul><a href="'
	    for (var l = 0; l < href.length; l++){
		    if (href[l].id_restaurant == promos[i].id_restaurant){
			    dom += 'https://www.lafourchette.com/restaurant/' + href[l].href + '/' + promos[i].id_restaurant + '">'
			    + restaurant_name + ' - ' + addr + ' - ' + stars + '</a>';
		    }
	    }
	    
	    for (var m = 0; m < promos[i].deals.length; m++){
	
		    dom += "\n<li>"+promos[i].deals[m].title+"</li>\n";
	    }
	    dom += "</ul>\n";
	} 
}

merge_all_restaurant_infos();

//console.log(dom);

class Home extends Component {
  render() {
    return ( dom
    );
  }
}
 
export default Home;

