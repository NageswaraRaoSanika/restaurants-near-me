import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Icon, Typography } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    card: {
      minWidth: 300,
      margin: "10px"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  });

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, restaurant } = this.props;
    const restaurantData = restaurant.restaurant;
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {restaurantData.name[0]}
              </Avatar>
            }
            action={
                <Icon>star_rate</Icon>
            }
            title={restaurantData.name}
            subheader={restaurantData.cuisines}
          />
          <CardMedia
            className={classes.media}
            image={restaurantData.thumb }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">
              {restaurantData.location.address}
              <br/>
              {restaurantData.location.locality_verbose}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
                <Icon>favorite</Icon>
            </IconButton>
            <IconButton aria-label="Share">
                <Icon>share</Icon>
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  restaurant: PropTypes.object
};

export default withStyles(styles)(RecipeReviewCard);
