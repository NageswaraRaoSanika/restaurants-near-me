import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Button, Icon, Typography, Grid } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import Image from '../Common/default.jpeg';



class RecipeReviewCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    restaurant: PropTypes.object
  };

  render() {
    const { classes, restaurant } = this.props;
    const restaurantData = restaurant.restaurant;
    const imageURL = restaurantData.thumb ? restaurantData.thumb : Image;
    return (
      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {restaurantData.name[0]}
              </Avatar>
            }
            title={restaurantData.name}
            subheader={restaurantData.location.locality}
          />
          <CardMedia
            className={classes.media}
            image={ imageURL }
            title="Restaurant Thumb"
          />
          <CardContent>
            <Typography component="label">
              {restaurantData.cuisines}
            </Typography><hr/>
            <Typography component="address">
              {restaurantData.location.address}
            </Typography><hr/>
            <Typography component="label">
              <Icon>local_play</Icon> {restaurantData.currency + " " + restaurantData.average_cost_for_two } for 2
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button aria-label="Votes">
                <Icon>favorite</Icon> {restaurantData.user_rating.votes}
            </Button>
            <Button aria-label="Rating">
                <Icon style={{color: `#${restaurantData.user_rating.rating_color}`}}>star</Icon> {restaurantData.user_rating.aggregate_rating}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

const styles = theme => ({
  card: {
    margin: "10px"
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export default withStyles(styles)(RecipeReviewCard);
