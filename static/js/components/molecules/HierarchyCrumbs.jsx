import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

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
    breadCrumbs: {
        [theme.breakpoints.down('md')]: {
            display: "none",
        },
    },
    list: {
        marginTop: theme.spacing.unit,
        [theme.breakpoints.up('md')]: {
            display: "none",
        },
        [theme.breakpoints.down('md')]: {
            display: "block",
        },
    },
    listItem: {
        backgroundColor: "#f50057",
        color: "white",
        '&:hover': {
            backgroundColor: '#c51162',
            cursor: "pointer"
        }
    },
    listItemIcon: {
        color: "#fff"
    },
    listItemText: {
        color: "#fff"
    }
});

class HierarchyCrumbs extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { literals, classes } = this.props;
        const link_group_hero = [
            //{ "href": "/profile", "title": literals.common.learnerprofile },
            { "index": 1, "href": "/explore/streams", "title": literals.common.streams },
            { "index": 2, "href": "/explore/practices", "title": literals.common.practices },
            { "index": 3, "href": "/explore/learning-points", "title": literals.common.learningpoints },
            { "index": 4, "href": "/explore/episodes", "title": literals.common.episodes },
        ];
        const groups = link_group_hero.sort(({ index: previousIndex }, { index: currentIndex }) => previousIndex - currentIndex)
        return (
            <Paper className={classes.paper}>
                <Breadcrumbs className={classes.breadCrumbs} separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb">
                    {
                        groups.map(button =>{
                            return (
                                <Button href={"#" + button.href} key={button.title} variant="contained" color="secondary">
                                    {button.title}
                                </Button>
                            )
                        })
                    }
                </Breadcrumbs> 
                <List className={classes.list} component="nav">
                    {
                        groups.map((button, index) =>{
                            return (
                                <ListItem component={Link} to={button.href} className={classes.listItem} key={index} button>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <ExpandMoreIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={button.title} classes={{primary: classes.listItemText}} /> 
                                </ListItem>
                            )
                        })
                    }
                </List>
                    
            </Paper>
        )
    }
}

HierarchyCrumbs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(HierarchyCrumbs));