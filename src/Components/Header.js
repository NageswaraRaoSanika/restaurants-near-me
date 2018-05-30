import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Drawer, AppBar, Toolbar, Typography, IconButton, Hidden, Divider, Icon} from '@material-ui/core';


export default class Header extends Component{

  static propTypes = {
    classes: PropTypes.object.isRequired,
    responsiveHeaderMenuOpen: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
  }

  render() {
    const { children, classes, responsiveHeaderMenuOpen, handleDrawerToggle } = this.props;

    const drawer = (
      <div style={{padding: "20px"}}>
        <Typography variant="title" color="inherit" noWrap>
        Filters
        </Typography>
        <br/>
        <Divider />
        <br/>
        {children}
      </div>
    );

    return (
      <div>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={ () => handleDrawerToggle() }
              className={classes.navIconHide} >
              <Icon>menu</Icon>
            </IconButton>

            <Typography variant="headline" color="inherit" noWrap>
              Restaurants <small style={{fontSize: "12px"}}>from Zomato</small>
            </Typography>

          </Toolbar>
        </AppBar>

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={'left'}
            open={responsiveHeaderMenuOpen}
            onClose={ () => handleDrawerToggle() }
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

      </div>
    );
  }
}
