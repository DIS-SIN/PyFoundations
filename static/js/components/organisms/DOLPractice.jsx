import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown"
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import GridInfoCard from "../molecules/GridInfoCard";
import Chip from "@material-ui/core/Chip";

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
        margin: 0,
    },
    progress: {
        padding: theme.spacing.unit * 2,
        flexGrow: 1,
    },
});

const ApiDataItem = props => (
    <React.Fragment>
        <Typography gutterBottom variant="h5" component="div">{props.apiitem.description}</Typography>
        <Typography gutterBottom variant="h4" component="div">{props.apiitem.slug}</Typography>
        <Typography gutterBottom variant="h6" component="div">{props.literals.common.tags}</Typography>
        <ApiDataItemChild apiitem={props.apiitem} childnode="tags" childval="tag" />
    </React.Fragment>
);
const ApiDataItemChild = props => (
    props.apiitem[props.childnode] == null ? (
        <React.Fragment key={props.index}>
            <Typography gutterBottom variant="button" component="div">
                ...
            </Typography>
        </React.Fragment>
    ) : (
            props.apiitem[props.childnode].map((item, index) => (
                <React.Fragment key={index}>
                    <Chip
                        icon={props.icon ? props.icon : null}
                        label={item[props.childval] ? item[props.childval] : item}
                        color="primary"
                    />
                </React.Fragment>
            ))
        )
);
class DOLPractice extends React.Component {
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
        let fetchid = this.props.fetchid;
        fetch("/api/practice/" + fetchid) // dol/api/gettest // /api/learning_point
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
        const { literals, location, classes, fetchid } = this.props;

        const link_group_hero = [
            { "href": "/explore", "title": literals.common.explore },
        ];
        const link_group_practice = [
            { "href": "/profile/add/practice", "title": literals.common.addto + " " + literals.common.profile },
        ];

        if (error) {
            return (
                <Grid item xs={12}>
                    <h1>FETCH: {fetchid}</h1>
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
                    <div className={classes.progress}>
                        <LinearProgress color="secondary" />
                    </div>
                </Grid>
            );
        } else {
            const api_state = apireturn.slice(0)[0].api_return;
            const api_content = apireturn.slice(0)[0].api_data;
            const apiitem = apireturn.slice(0)[0].api_data;

            //console.log(api_content);
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
                    //apiDataItem = api_content.map((apiitem, index) => (
                    //text = {< ReactMarkdown source = { apiitem.body } />}
                    apiDataItem = (
                        <GridInfoCard
                            key={apiitem.id}
                            title={apiitem.name}
                            cover="http://placeimg.com/640/360/tech"
                            text={<ApiDataItem apiitem={apiitem} index={apiitem.id} literals={literals} />}
                            links={link_group_practice}
                            xs={12}
                            sm={12}
                            md={12}
                            fetchid={fetchid}
                        />
                    )
                    //))
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
                    <Grid spacing={0} alignItems="center" justify="center" container>
                        {apiDataItem}
                    </Grid>
                </React.Fragment>
            )
            return returnFragment;
        }
    }
}

DOLPractice.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLPractice));