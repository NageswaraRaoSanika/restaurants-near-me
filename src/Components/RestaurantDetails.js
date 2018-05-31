import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogContent, DialogActions, Button, withMobileDialog } from '@material-ui/core';

import Restaurant from './Restaurant';

class RestaurantDetails extends React.Component {
  static propTypes = {
    restaurantData: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

  render() {
    const { restaurantData, fullScreen, onClose, open } = this.props;
    return restaurantData.name ?
        (<Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title" >

            <DialogContent>
                <Restaurant size={12} key={restaurantData.id} openModal={()=>  null} restaurant={restaurantData} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
             </DialogActions>

        </Dialog>) : null;
  }
}

export default withMobileDialog()(RestaurantDetails);
