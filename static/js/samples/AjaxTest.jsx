import React, { Component } from "react";

// maybe import higher up?
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Chip from '@material-ui/core/Chip';
import LabelIcon from '@material-ui/icons/Label';
import DoneIcon from '@material-ui/icons/Done';
import Typography from "@material-ui/core/Typography";

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from "@material-ui/core/Grid";

// redux state
import { connect } from "react-redux";
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
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
});

class AjaxTest extends React.Component {
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
        fetch("/api/experiences") // dol/api/gettest // /api/learning_point
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result);
                    this.setState({
                        isLoaded: true,
                        apireturn: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
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

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/experience', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tag: this.state.post
            }),
        });
        const body = await response.json();//response.text();
        this.setState({
            responseToPost: body
        });
        alert(JSON.stringify(body));
    }

    render() {
        const { error, isLoaded, apireturn, post, response, responseToPost } = this.state;
        const { literals, classes } = this.props;
        if (error) {
            return <div>{literals.ajaxtest.error} {error.message}</div>;
        } else if (!isLoaded) {
            return <div>{literals.ajaxtest.loading}...</div>;
        } else {
            const ajaxTestReturnFragment = (
                <React.Fragment>
                    <form className="reqResDetails" onSubmit={this.handleSubmit}>
                        <Typography variant="h6" gutterBottom>
                            {literals.ajaxtest.post}:
                        </Typography>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="component-helper-post">{literals.form.fieldname}</InputLabel>
                            <Input
                                id="component-helper-post"
                                name="post"
                                value={post}
                                onChange={e => this.setState({ post: e.target.value })}
                                aria-describedby="component-helper-post-text"
                            />
                            <FormHelperText id="component-helper-post-text">Data to send out</FormHelperText>
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit">
                            <DoneIcon /> {literals.form.submit}
                        </Button>
                    </form>
                    <div>
                        <div className="requestDetails">
                            <Typography variant="overline" gutterBottom>
                                {literals.ajaxtest.request}:
                            </Typography>
                            <Typography component="div">
                                <pre>{JSON.stringify(post, null, 2)}</pre>
                            </Typography>
                        </div>
                        <div className="responseToPostDetails">
                            <Typography variant="overline" gutterBottom>
                                {literals.ajaxtest.response}:
                            </Typography>
                            <Typography component="div">
                                <pre>{JSON.stringify(responseToPost, null, 2)}</pre>
                            </Typography>
                        </div>
                        <div className="responseDetails">
                            <Typography variant="overline" gutterBottom>
                                {literals.ajaxtest.fetch}:
                            </Typography>
                            <Typography component="div">
                                <pre>{JSON.stringify(apireturn, null, 2)}</pre>
                            </Typography>
                        </div>
                    </div>
                </React.Fragment>
            )

            //[{ "api_data": [], "api_return": "success" }]
            const api_state = apireturn.slice(0)[0].api_return;
            const api_content = apireturn.slice(0)[0].api_data;

            let learningPointItem = "";

            if (api_state === "success") {
                if (api_content.length === 0) {
                    //alert("N O D A T A, API OK " + api_content.length);
                    learningPointItem = (
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="headline" component="h2">
                                No Records Found
                            </Typography>
                        </Grid>
                    );
                } else {
                    //alert("S U C C E S S " + api_content.length);
                    learningPointItem = api_content.map((apiitem, index) => (
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
                learningPointItem = (
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="headline" component="h2">
                            API Failed
                        </Typography>
                    </Grid>
                );
            }


            {/*
            if (learningpoints_api_state === "success") {
                alert(apireturn.api_data.length);

                const learningpoints = apireturn.slice(0)[0].api_data;
                if (apireturn.api_data.length == 0) {
                    learningPointItem = (
                        <Grid item xs={12} key={index}>
                            <Typography gutterBottom variant="headline" component="h2">
                                No Records Found
                            </Typography>
                        </Grid>
                    );
                } else {
                    learningPointItem = learningpoints.map((learningpoint, index) => (
                        <Grid item xs={12} key={index}>
                            <Typography gutterBottom variant="headline" component="h2">
                                {learningpoint.name}
                                <Chip
                                    icon={<LabelIcon />}
                                    label={learningpoint.difficulty}
                                    color="primary"
                                />
                            </Typography>
                            <Typography component="p">
                                {learningpoint.description} ({learningpoint.slug})
                            </Typography>
                            {learningpoint.tags.map((tag, index) => (
                                <React.Fragment key={index}>
                                    <Chip
                                        icon={<LabelIcon />}
                                        label={tag.tag + " @" + tag.added_timestamp}
                                        color="primary"
                                    />
                                </React.Fragment>
                            ))}
                        </Grid>
                    ))
                }
            } else {
                learningPointItem = (
                    <Grid item xs={12} key={index}>
                        <Typography gutterBottom variant="headline" component="h2">
                            API Failure
                        </Typography>
                    </Grid>
                );
            }
        */}

            //  {learningPointItem}
            const returnFragment = (
                <React.Fragment>
                    <Grid spacing={24} alignItems="center" justify="center" container>
                        {learningPointItem}
                    </Grid>
                    {ajaxTestReturnFragment}
                </React.Fragment>
            )
            return returnFragment;
        }
    }
}

/**
 *                 <div key={index}>
                    <h3>{learningpoint.name}</h3>
                    <p>
                        <small>{learningpoint.description} ({learningpoint.slug})</small>
                    </p>
                    <p>
                        <strong>{learningpoint.difficulty}</strong>
                    </p>
                    <div className="learningPointItem">
                        {learningpoint.tags.map((tag, index) => (
                            <React.Fragment key={index}>
                                <Chip
                                    icon={<LabelIcon />}
                                    label={tag.tagname + " @" + tag.id + " " + tag.datetime}
                                    color="primary"
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
 */
//export default connect(mapStateToProps)(AjaxTest);


AjaxTest.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(AjaxTest));