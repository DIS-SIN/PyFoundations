import React, { Component } from "react";
import { connect } from "react-redux";
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LabelIcon from '@material-ui/icons/Label';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import classNames from 'classnames';
import AjaxTest from "../../samples/AjaxTest";

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
});

class DOLPageExperiences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            learningpoints: [],
            post: "",
            response: "",
            responseToPost: ""
        };
    }

    // this fires when the component loads

    componentDidMount() {
        fetch("/api/experience") // dol/api/gettest // /api/learning_point
            .then(res => res.json())
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
        const { error, isLoaded, apireturn, post, response, responseToPost } = this.state;
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/home", "title": literals.pages.stub.hero.home },
        ];
        /*
        const override = true;

        if (override) {
            return (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.common.dol}
                        <AjaxTest />
                    </Typography>
                </Grid>
            );
        }
        */

        if (error) {
            return (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.ajaxtest.error} {error.message}
                    </Typography>
                </Grid>
            );
        } else if (!isLoaded) {
            return (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.ajaxtest.loading}...
                    </Typography>
                </Grid>
            );
        } else {
            const api_state = apireturn.slice(0)[0].api_return;
            const api_content = apireturn.slice(0)[0].api_data;

            let apiDataItem = "";

            if (api_state === "success") {
                if (api_content.length === 0) {
                    //alert("N O D A T A, API OK " + api_content.length);
                    apiDataItem = (
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="headline" component="h2">
                                No Records Found
                            </Typography>
                        </Grid>
                    );
                } else {
                    //alert("S U C C E S S " + api_content.length);
                    apiDataItem = api_content.map((apiitem, index) => (
                        <Grid item xs={12} key={index}>
                            <Typography gutterBottom variant="headline" component="h2">
                                {apiitem.occurred_at}
                            </Typography>
                            {(
                                apiitem.tags == null ? (
                                    <React.Fragment key={index}>
                                        <Typography gutterBottom variant="headline" component="div">
                                            Add Tag...
                                        </Typography>
                                    </React.Fragment>
                                ) : (
                                        apiitem.tags.map((tag, index) => (
                                            <React.Fragment key={index}>
                                                <Chip
                                                    icon={<LabelIcon />}
                                                    label={tag}
                                                    color="primary"
                                                />
                                            </React.Fragment>
                                        ))
                                    )
                            )}
                        </Grid >
                    ))
                }
            } else {
                apiDataItem = (
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="headline" component="h2">
                            API Failed
                        </Typography>
                    </Grid>
                );
            }

            //  {apiDataItem}
            const returnFragment = (
                <React.Fragment>
                    <CssBaseline />
                    <HeroHeader
                        title={literals.pages.experiences.hero.title}
                        icon={<HelpOutlineIcon />}
                        text={<React.Fragment key="herotext">
                            {ReactHtmlParser(literals.pages.experiences.hero.text)}
                        </React.Fragment>}
                        links={link_group_hero}
                    />
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        <Grid spacing={24} alignItems="center" justify="center" container>
                            {apiDataItem}
                        </Grid>
                    </div>
                </React.Fragment>
            )
            return returnFragment;
        }
    }
}

DOLPageExperiences.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLPageExperiences));

/**
 *
 *  {
 *      "comments": null,
		"depth": null,
		"difficulty": 1,
		"id": 1,
		"learning_resource": null,
		"learning_resource_id": 1,
		"occurred_at": "Tue, 29 Jan 2019 19:48:49 GMT",
		"points": 500,
		"practices": [{
			"Description": "",
			"ID": 0,
			"Image": null,
			"Name": "Understanding Technology",
			"Selected": false,
			"Skills": null,
			"Slug": "",
			"Tags": null
		}, {
			"Description": "",
			"ID": 0,
			"Image": null,
			"Name": "Problem Solving",
			"Selected": false,
			"Skills": null,
			"Slug": "",
			"Tags": null
		}],
		"query": null,
		"query_class": null,
		"skills": null,
		"stream": {
			"Description": "",
			"Expertise": 0,
			"ID": 0,
			"Image": null,
			"LearningTargets": null,
			"Name": "Digital Literacy",
			"Practices": null,
			"Selected": false,
			"Slug": "",
			"Tags": null
		},
		"tags": ["Golang", "Files", "Development"],
		"time": 2,
		"user_name": "Chris Allison",
		"validated": null,
		"value": 2,
		"verb": "watch"
	}
 */

