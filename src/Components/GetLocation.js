import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogContent, DialogContentText, DialogTitle, withMobileDialog } from '@material-ui/core';

import LocationAutoComplete from '../Containers/LocationAutoComplete';

class GetLocation extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    getLocation: PropTypes.func.isRequired
  };

  render() {
    const { fullScreen, open, onClose, getLocation } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title" >

        <DialogTitle id="responsive-dialog-title">{"Please Enter your Location"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Setting up Location will help you in Finding the best restaurants, cafés, and bars in your area.
          </DialogContentText><br/><br/>

          <LocationAutoComplete getLocation={getLocation} />
          
          <br/><br/><br/><br/><br/><br/><br/><br/>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withMobileDialog()(GetLocation);