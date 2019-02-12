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
        fetch("/api/test/learningpoint") // pyfoundations/api/gettest
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result,
                        learningpoints: result.learningpoints
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

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/test/puttest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: this.state.post,
                pyfoundations_ask: this.state.post
            }),
        });
        const body = await response.json();//response.text();
        this.setState({
            responseToPost: body
        });
    }

    render() {
        const { error, isLoaded, learningpoints, post, response, responseToPost } = this.state;
        const { literals, classes } = this.props;
        if (error) {
            return <div>{literals.ajaxtest.error} {error.message}</div>;
        } else if (!isLoaded) {
            return <div>{literals.ajaxtest.loading}...</div>;
        } else {
            // id name description slug tags{id tag datetime} difficulty
            /**
             *                         <input
                                        type="text"
                                        value={post}
                                        onChange={e => this.setState({ post: e.target.value })}
                                    />
             */
            const learningPointReturnFragment = (
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
                                <pre>{JSON.stringify(response, null, 2)}</pre>
                            </Typography>
                        </div>
                    </div>
                </React.Fragment>
            )

            const data = learningpoints.slice(0);

            //<small><strong>{tag.tagname}</strong> ({tag.id}@{tag.datetime})</small>

            const learningPointItem = data.map((learningpoint, index) => (
                <Grid item xs={6} key={index}>
                    <Card>
                        <CardMedia style={{ height: 0, paddingTop: '56.25%' }}
                            image="/static/images/weasel.jpg"
                            title="Card Media"
                        />
                        <CardContent>
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
                        </CardContent>
                        <CardActions>
                            {learningpoint.tags.map((tag, index) => (
                                <React.Fragment key={index}>
                                    <Chip
                                        icon={<LabelIcon />}
                                        label={tag.tagname + " @" + tag.id + " " + tag.datetime}
                                        color="primary"
                                    />
                                </React.Fragment>
                            ))}
                        </CardActions>
                    </Card>
                </Grid>
            ))



            const returnFragment = (
                <div className="learningPoint">
                    {learningPointReturnFragment}
                    <Grid spacing={24} alignItems="center" justify="center" container>
                        {learningPointItem}
                    </Grid>
                </div>
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