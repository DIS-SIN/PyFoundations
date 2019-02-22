import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
    root: {
        bottom: 0,
        marginBottom: 0,
        width: '100%',
        //        width: 500,
        position: 'fixed',
    }
};

class SimpleBottomNavigation extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <React.Fragment>
                <BottomNavigation
                    color="primary"
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                    elevation={1}
                >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                    <BottomNavigationAction label="Another One" icon={<LocationOnIcon />} />
                    <BottomNavigationAction label="And Another" icon={<LocationOnIcon />} />
                </BottomNavigation>
            </React.Fragment>

        );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
