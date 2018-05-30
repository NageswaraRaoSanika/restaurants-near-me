import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Header from '../Components/Header';
import GetLocation from '../Components/GetLocation';
import styles from './Styles';

class ResponsiveDrawer extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {
      repsonsiveHeaderMenu: false,
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState({ repsonsiveHeaderMenu: !this.state.repsonsiveHeaderMenu });
  };

  render() {

    const { classes } = this.props;
    const {repsonsiveHeaderMenu} = this.state;

    return (
      <div className={classes.root}>

        <Header handleDrawerToggle={this.handleDrawerToggle} responsiveHeaderMenuOpen={repsonsiveHeaderMenu} classes={classes} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>
            List of Restaurants will come here
          </Typography>
        </main>

        <GetLocation />

      </div>
    );
  }
}

export default withStyles(styles)(ResponsiveDrawer);