import React, { Component } from "react";
 
import data from './promos.json';

 
class Home extends Component {
  render() {
    return (
        <ul>
        {
          data.map(function(restaurant){
            return <li>{restaurant.name} - {restaurant.promo}</li>;
          })
        }
        </ul>
    );
  }
}
 
export default Home;