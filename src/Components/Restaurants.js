import React, { Component } from 'react';

import Restaurant from './Restaurant';
import RestaurantDetails from './RestaurantDetails';
import Grid from '@material-ui/core/Grid';

class Restaurants extends Component{
    constructor (){
        super();

        this.state ={
            openModal: false,
            restaurant: {}
        }
        this.openModal = this.openModal.bind(this);
    }
    openModal = (restaurant) => {
        this.setState({
            openModal: true,
            restaurant: restaurant
        })
    }

    render() {
        const { data } = this.props;
        return (
            <Grid container spacing={16}> 
                { 
                    data.map( restaurant => 
                        <Restaurant
                            openModal={this.openModal}
                            key={restaurant.restaurant.id}
                            restaurant={restaurant}
                            size={4}
                        />
                    )
                }
                
                <RestaurantDetails restaurantData={this.state.restaurant} open={this.state.openModal} onClose={() => this.setState({openModal:false})} />
            </Grid>
        );
    }

}
export default Restaurants;