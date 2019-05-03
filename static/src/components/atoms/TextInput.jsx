import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%"
  },
});

class TextInput extends React.Component {
  state = {
    name: 'Composed TextField',
  };

  componentDidMount() {
    this.forceUpdate();
  }

  handleChange = (input) => (event) => {
    this.props.onChange(event.target.value)
  };

  render() {
    const { classes, label, helperText, value } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-helper">{label}</InputLabel>
          <Input
            id="component-helper"
            onChange={this.handleChange(value)}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">{helperText}</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string, 
  value: PropTypes.string.isRequired,  
};

export default withStyles(styles)(TextInput);