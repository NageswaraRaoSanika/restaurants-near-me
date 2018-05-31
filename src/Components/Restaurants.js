import React from 'react';
import Restaurant from './Restaurant';

import Grid from '@material-ui/core/Grid';

const Restaurants = (props) => {
    return <Grid container spacing={16}> { props.data.map( restaurant => <Restaurant key={restaurant.restaurant.id} restaurant={restaurant}/>)} </Grid>;
}
export default Restaurants;