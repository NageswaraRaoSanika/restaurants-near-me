import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

import { MenuItem, TextField, Paper} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';

import {getLocations} from '../Apis';

const renderInput = (inputProps) => {
  const { classes, ref, ...other } = inputProps;
  return (
    <TextField fullWidth InputProps={{inputRef: ref, ...other, }} />
  );
}

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = (suggestion) => (
  <MenuItem component="div">
    <div>{suggestion.title}</div>
  </MenuItem>
);

const renderSuggestionsContainer = (options) => {
  const { containerProps, children } = options;
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}


class LocationAutoComplete extends Component{

  static propTypes = {
    classes: PropTypes.object.isRequired,
    getLocation:PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSelectedLocationDetails = this.getSelectedLocationDetails.bind(this);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {

    getLocations(value).then(
      suggestions => {
        this.setState({
          suggestions: suggestions
        })
      }
    );

  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  
  getSelectedLocationDetails = (event, { suggestion }) => {
    this.props.getLocation(suggestion);
  }
  
  render() {
    const { value, suggestions } = this.state;
    const {classes} = this.props;

    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionSelected={this.getSelectedLocationDetails}
        inputProps={inputProps}
        renderInputComponent={renderInput}
      />
    );
  }
}

export default withStyles(styles)(LocationAutoComplete);
