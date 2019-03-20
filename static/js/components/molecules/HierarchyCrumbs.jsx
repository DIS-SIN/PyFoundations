import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const styles = theme => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    paper: {
		padding: theme.spacing.unit * 2,
		marginBottom: '10px',
    },
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

class HierarchyCrumbs extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {classes} = this.props;
        return (
            <Paper className={classes.paper}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb">
                    {
                        this.props.groups.sort(({ index: previousIndex }, { index: currentIndex }) => previousIndex - currentIndex).map(button =>{
                            return (
                                <Button href={"#" + button.href} key={button.title} variant="contained" color="secondary">
                                    {button.title}
                                </Button>
                            )
                        })
                    }
                </Breadcrumbs> 
		    </Paper>
        )
    }
}

HierarchyCrumbs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HierarchyCrumbs);