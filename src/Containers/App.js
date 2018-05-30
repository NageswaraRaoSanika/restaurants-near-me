import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Header from '../Components/Header';
import GetLocation from '../Components/GetLocation';
import styles from '../Common/Styles';
import Filters from '../Components/Filters';

import {getCuisineTypes} from '../Apis';

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
      selectedCuisines: []
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleLocationModalClose = this.handleLocationModalClose.bind(this);
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
    });

  }

  getSelectedCuisines = (cuisines) => {
    this.setState({
      selectedCuisines: cuisines
    });
    console.log(cuisines)
  }

  render() {

    const { classes } = this.props;
    const {repsonsiveHeaderMenu, locationModalOpen, selectedLocation, cuisineTypes} = this.state;

    const filters = <Filters getLocation={this.getSelectedLocation} selectedLocation={selectedLocation} cuisineTypes={cuisineTypes} selectedCuisines={this.getSelectedCuisines}/>

    return (
      <div className={classes.root}>

        <Header children={filters} handleDrawerToggle={this.handleDrawerToggle} responsiveHeaderMenuOpen={repsonsiveHeaderMenu} classes={classes} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>
            List of Restaurants will come here
          </Typography>
        </main>

        <GetLocation open={locationModalOpen} getLocation={this.getSelectedLocation} onClose={this.handleLocationModalClose} />

      </div>
    );
  }
}

export default withStyles(styles)(ResponsiveDrawer);