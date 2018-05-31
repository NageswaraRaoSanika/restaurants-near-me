import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, List, ListItem, TextField, ListItemIcon, Chip, Input, Select, MenuItem, Checkbox, ListItemText} from '@material-ui/core';
import LocationAutoComplete from '../Containers/LocationAutoComplete';

export default class Filters extends Component{
  static propTypes = {
    getLocation: PropTypes.func.isRequired,
    selectedLocation: PropTypes.object,
    cuisineTypes: PropTypes.array,
    selectedCuisines: PropTypes.func,
    filter: PropTypes.func,
    restaurantsText: PropTypes.string,
    setRestaurantsText: PropTypes.func
  };

  constructor() {
    super();
    
    this.state = {
      cuisineTypesSelected: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ cuisineTypesSelected: event.target.value });
    const selectedIds = event.target.value.map ( cuisine => cuisine.split("__")[0]);
    this.props.selectedCuisines(selectedIds);
  };

  getCuisineIds = event => {
    const selectedIds = this.state.cuisineTypesSelected.map ( cuisine => Number(cuisine.split("__")[0]));
    this.props.selectedCuisines(selectedIds);
  }

  render() {
    const {selectedLocation, getLocation, cuisineTypes, filter, restaurantsText, setRestaurantsText} = this.props;

    const cuisineTypesElemenet = !cuisineTypes.length ? <Button> Cuisine Types </Button>
    : <Select
      multiple
      value={this.state.cuisineTypesSelected}
      onChange={this.handleChange}
      onClose={this.getCuisineIds}
      input={<Input fullWidth/>}
      renderValue={selected => (
        <div style={{display: "flex", flexWrap: "wrap" }}>
          {selected.map(value => <Chip style={{margin: "1px"}} key={value} label={value.split("__")[1]} />)}
        </div>
      )}
      MenuProps={{
        PaperProps: {
          style: {
            width: 250,
          },
        }
      }}
      >
      { cuisineTypes.map(c => (
      <MenuItem key={c.cuisine.cuisine_id} value={c.cuisine.cuisine_id + "__" + c.cuisine.cuisine_name}>
        <Checkbox checked={this.state.cuisineTypesSelected.indexOf(c.cuisine.cuisine_id + "__" + c.cuisine.cuisine_name) > -1}/>
        <ListItemText primary={c.cuisine.cuisine_name} />
      </MenuItem>
    ))}
  </Select> ;

    return(
      <div key='1122'>
        <List component="nav">
        <ListItem>
          <ListItemIcon>
            <Icon>person_pin_circle</Icon>
          </ListItemIcon>
          <LocationAutoComplete selectedLocation={selectedLocation.name} getLocation={getLocation} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>restaurant</Icon>
          </ListItemIcon>
          <TextField defaultValue={restaurantsText} onChange={(e) => setRestaurantsText(e)} label="Restaurant Name" />
        </ListItem>
        <br/>
        <ListItem>
          <ListItemIcon>
            <Icon>local_dining</Icon>
          </ListItemIcon>
          {
            cuisineTypesElemenet
          }
        </ListItem>
        <br/><br/>
        <ListItem button onClick={filter}>
          <Button fullWidth variant="raised" color="primary" aria-label="Filter">
            <Icon>filter_list</Icon> Filter
          </Button>
        </ListItem>
      </List>
      </div>
    )
  }
}