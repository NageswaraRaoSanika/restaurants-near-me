import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Header from '../Components/Header';
import GetLocation from '../Components/GetLocation';
import styles from '../Common/Styles';
import Filters from '../Components/Filters';
import Restaurants from '../Components/Restaurants';

import { getCuisineTypes, getRestaurants } from '../Apis';

class ResponsiveDrawer extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.state = {
      repsonsiveHeaderMenu: false,
      locationModalOpen: true,
      selectedLocation: {},
      cuisineTypes:[],
      selectedCuisines: [],
      searchQuery: "",
      restaurants: []
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleLocationModalClose = this.handleLocationModalClose.bind(this);
    this.filterRestaurants = this.filterRestaurants.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState({ repsonsiveHeaderMenu: !this.state.repsonsiveHeaderMenu });
  };

  handleLocationModalClose = () => {
    this.setState({ locationModalOpen: false });
  }

  getSelectedLocation = (location) => {
    this.handleLocationModalClose();
    getCuisineTypes(location.id).then( cuisines => {
      this.setState({
        selectedLocation: location,
        cuisineTypes: cuisines
      });
    }).then( x => {
      this.filterRestaurants();
    })

  }

  filterRestaurants = () => {
    const {selectedLocation, selectedCuisines, searchQuery} = this.state;
    getRestaurants(selectedLocation.id, searchQuery, selectedCuisines).then( restaurants => {
      this.setState({
        restaurants: restaurants
      });
    });
  }

  getSelectedCuisines = (cuisines) => {
    this.setState({
      selectedCuisines: cuisines
    });
  }

  setRestaurantsText = (e) => {
    this.setState({
      searchQuery: e.target.value
    });
  }

  render() {

    const { classes } = this.props;
    const {repsonsiveHeaderMenu, locationModalOpen, selectedLocation, cuisineTypes, searchQuery, restaurants} = this.state;
    const filters = <Filters
                      restaurantsText={searchQuery}
                      setRestaurantsText={this.setRestaurantsText}
                      getLocation={this.getSelectedLocation}
                      selectedLocation={selectedLocation}
                      cuisineTypes={cuisineTypes}
                      selectedCuisines={this.getSelectedCuisines}
                      filter={this.filterRestaurants}
                    />

    return (
      <div className={classes.root}>

        <Header children={filters} handleDrawerToggle={this.handleDrawerToggle} responsiveHeaderMenuOpen={repsonsiveHeaderMenu} classes={classes} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Restaurants data={restaurants} />
        </main>

        <GetLocation open={locationModalOpen} getLocation={this.getSelectedLocation} onClose={this.handleLocationModalClose} />

      </div>
    );
  }
}

export default withStyles(styles)(ResponsiveDrawer);