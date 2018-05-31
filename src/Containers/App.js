import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from '../Components/Header';
import GetLocation from '../Components/GetLocation';
import styles from '../Common/Styles';
import Filters from '../Components/Filters';
import Restaurants from '../Components/Restaurants';

import { Select, MenuItem, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
      restaurants: [],
      sort: "rating"
    };

    // binding methods in constructor (autobinding)
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleLocationModalClose = this.handleLocationModalClose.bind(this);
    this.filterRestaurants = this.filterRestaurants.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    // Check for the location in localstorage
    const selectedLocation = this.getLocationFromLocalStorage();
    // If Location found then perform automatic calls based on our storage
    if(selectedLocation !== null) {
      this.getSelectedLocation(selectedLocation);
    }
  }

  //helper functions for filters and header drawers
  handleDrawerToggle = () => {
    this.setState({ repsonsiveHeaderMenu: !this.state.repsonsiveHeaderMenu });
  };

  handleLocationModalClose = () => {
    this.setState({ locationModalOpen: false });
  }

  getSelectedLocation = (location) => {
    this.handleLocationModalClose();

    this.setLocationFromLocalStorage(location);

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
    const {selectedLocation, selectedCuisines, searchQuery, sort} = this.state;
    getRestaurants(selectedLocation.id, searchQuery, selectedCuisines, sort).then( restaurants => {
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

  handleSort = (e) => {
    this.setState({
      sort: e.target.value
    }, () => {
        this.filterRestaurants();
    });
  }

  //getters and setter for localstorage, we can also use sessionStorage for sessions
  getLocationFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('location'));
  }
  setLocationFromLocalStorage = (location) => {
    return localStorage.setItem('location', JSON.stringify(location));
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

    const restaurantsElements = restaurants.length ? <Restaurants data={restaurants} /> : <Typography variant="title"><br/><br/>No Restaurants Found</Typography>;

    return (
      <div className={classes.root}>

        <Header children={filters} handleDrawerToggle={this.handleDrawerToggle} responsiveHeaderMenuOpen={repsonsiveHeaderMenu} classes={classes} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="title" >
              Restaurants
              <Select
                value={this.state.sort}
                onChange={(e) => {this.handleSort(e)}}
                inputProps={{
                  name: 'Sort',
                  id: 'sorting-header',
                }}
                style={{float: "right"}}
              >
                <MenuItem value={"cost"}>Cost</MenuItem>
                <MenuItem value={"rating"}>Rating</MenuItem>
              </Select>
          </Typography>
          {restaurantsElements}
        </main>

        <GetLocation open={locationModalOpen} getLocation={this.getSelectedLocation} onClose={this.handleLocationModalClose} />

      </div>
    );
  }
}

export default withStyles(styles)(ResponsiveDrawer);