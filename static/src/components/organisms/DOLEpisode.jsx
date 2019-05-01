import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles, withTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import GridInfoCard from "../molecules/GridInfoCard";
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

class DOLEpisode extends React.Component {
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
        let fetchid = this.props.fetchid;
        fetch("/api/episodes/" + fetchid) // dol/api/gettest // /api/learning_point
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
                        apireturn: [result]
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
        const { literals, location, classes, fetchid } = this.props;

        const link_group_hero = [
            { "href": "/explore", "title": literals.common.explore },
        ];
        const link_group_episode = [
            { "href": "/profile/add/episode", "title": literals.common.addto + " " + literals.common.profile },
        ];

        let apiDataItem = "";
        let apiDataItemBundle = "";

        if (error) {
            apiDataItem = (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.ajaxtest.error} {error.message} {fetchid}
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
                        key={apiitem.slug}
                        title={apiitem.title}
                        video={
                            <iframe frameBorder="0" width="100%" height="315"
                                src={apiitem.videos ? apiitem.videos[0].Path : "https://www.youtube.com/embed/lv7TU4ESuMM"}></iframe>
                        }//"http://placeimg.com/640/360/any"
                        text={
                            <React.Fragment>
                                {apiitem.podcasts ? (
                                    <iframe width="100%" height="166" scrolling="no"
                                        frameBorder="no" src={"https://w.soundcloud.com/player/?url=" + apiitem.podcasts[0].Path}>
                                    </iframe>) : null
                                }
                                <ReactMarkdown source={apiitem.body} />
                            </React.Fragment>
                        }
                        links={link_group_episode}
                        xs={12}
                        sm={12}
                        md={12}
                        fetchid={fetchid}
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
                <Grid spacing={0} container>
                    {apiDataItem}
                </Grid>
            </React.Fragment>
        )
        return returnFragment;

    }
}

DOLEpisode.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLEpisode));
