import React from 'react';
import Restaurant from './Restaurant';
const Restaurants = (props) => {
    return <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap"}}> { props.data.map( restaurant => <Restaurant key={restaurant.restaurant.id} restaurant={restaurant}/>)} </div>;
}
export default Restaurants;