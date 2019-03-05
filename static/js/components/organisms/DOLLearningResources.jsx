import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown"
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import GridInfoCard from "../molecules/GridInfoCard";
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};


// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    layout: {
        width: 'auto',
        marginLeft: 0,//theme.spacing.unit * 3,
        marginRight: 0,//theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
        paddingTop: 16,
        backgroundColor: theme.palette.background.paper,
        margin: 0,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    progress: {
        margin: theme.spacing.unit * 2,
        flexGrow: 1,
    },
});

class DOLLearningResources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            learningpoints: [],
            post: "",
            response: "",
            responseToPost: "",
            apireturn_status: null,
        };
    }

    // this fires when the component loads

    componentDidMount() {
        fetch("/api/learning_resource/") // dol/api/gettest // /api/learning_point
            .then((res) => {
                //console.log(res.status);
                this.setState({
                    apireturn_status: res.status
                });
                return res.json();
            })
            .then(
                (result) => {
                    //console.log(result);
                    this.setState({
                        isLoaded: true,
                        apireturn: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        // end fetch
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const { error, isLoaded, apireturn, post, response, responseToPost, apireturn_status } = this.state;
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/explore", "title": literals.common.explore },
        ];
        const link_group_learningresource = [
            { "href": "/view/learning_resource", "title": "Learning Resource" },
            { "href": "/profile/add/learning_resource", "title": literals.common.addto + " " + literals.common.profile },
        ];

        let apiDataItem = "";
        let apiDataItemBundle = "";
        if (error) {
            apiDataItem = (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.ajaxtest.error} {error.message}
                    </Typography>
                </Grid>
            );
        } else if (!isLoaded) {
            apiDataItem = (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.ajaxtest.loading}...
                    </Typography>
                    <div className={classes.progress}>
                        <LinearProgress color="secondary" />
                    </div>
                </Grid>
            );
        } else {

            if (apireturn_status === 200) {
                const api_content = apireturn.slice(0);
                const apiRenderItems = api_content.map((apiitem, index) => (
                    <GridInfoCard
                        key={apiitem.id}
                        title={apiitem.title}
                        text={
                            <React.Fragment>
                                <Typography gutterBottom variant="caption" component="div">
                                    {apiitem.added_on}
                                </Typography>
                                <Button target="_blank" href={apiitem.path}>
                                    {apiitem.path
                                        .replace(/\//g, ' ')
                                        .replace(/\_/g, ' ')
                                        .replace(/\./g, ' ')
                                        .replace(/\-/g, ' ')
                                    }
                                </Button>
                                <ReactMarkdown source={apiitem.description} />
                            </React.Fragment>
                        }
                        links={link_group_learningresource}
                        xs={12}
                        sm={4}
                        md={4}
                        fetchid={apiitem.id}
                    />
                ));
                apiDataItemBundle = (
                    <React.Fragment>
                        {apiRenderItems}
                    </React.Fragment>
                );
            } else {
                apiDataItemBundle = (
                    <Typography variant="button" color="inherit">
                        ...
                    </Typography>
                );
            }
            apiDataItem = (
                <React.Fragment>
                    {apiDataItemBundle}
                </React.Fragment>
            );
        }

        //  {apiDataItem}
        const returnFragment = (
            <React.Fragment>
                <Grid spacing={8} container>
                    {apiDataItem}
                </Grid>
            </React.Fragment>
        )
        return returnFragment;

    }
}

DOLLearningResources.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLLearningResources));
