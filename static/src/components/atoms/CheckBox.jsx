import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%"
  },
});

class CheckBox extends React.Component {

  handleChange = value => event => {
    this.props.onChange({value: value, checked: event.target.checked})
  };

  render() {
    const { classes, helperText, label, values } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              <Grid container>
                {
                    values.map( value => (
                      <Grid key={value.value} item xs={6} sm={3}>
                          <FormControlLabel
                              control={
                                  <Checkbox onChange={this.handleChange(value.value)} value={value.value.toString()} />
                              }
                              label={value.label}
                          />
                        </Grid>
                    ))
                }
              </Grid>
            </FormGroup>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

CheckBox.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string, 
  values: PropTypes.array.isRequired,  
};

export default withStyles(styles)(CheckBox);