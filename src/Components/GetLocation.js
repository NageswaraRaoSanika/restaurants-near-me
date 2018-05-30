import React from 'react';
import PropTypes from 'prop-types';

import { Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,withMobileDialog} from '@material-ui/core';

import LocationAutoComplete from './LocationAutoComplete';

class GetLocation extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.state = {
      open: true,
    };

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title" >

          <DialogTitle id="responsive-dialog-title">{"Please Enter your Location"}</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Setting up Location will help you in Finding the best restaurants, cafés, and bars in your area.
            </DialogContentText>
            <br/><br/>

            <LocationAutoComplete />

            <br/><br/>
          </DialogContent>

          <DialogActions>
            <Button variant="raised" onClick={this.handleClose} color="primary">
              Lets Go!
            </Button>
          </DialogActions>

        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(GetLocation);