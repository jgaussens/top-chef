import React, { Component } from "react";
 
import data from './promos.json';
import promos from './all_deals_API.json';
import href from './href_lafourchette.json';
import info from './info_restaurants.json';

 
class Home extends Component {
  render() {
    return (
        <ul>
        {
          /*data.map(function(restaurant){
            return <li>{restaurant.name} - {restaurant.promo}</li>;
          })*/
          

	        promos.map(function(restaurant){

	         return <div><pre>{JSON.stringify(restaurant, null, 2) }</pre></div>
	            

			})
          



          
        }
        </ul> 
    );
  }
}
 
export default Home;

