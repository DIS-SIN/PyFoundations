import React from 'react';
import PropTypes from 'prop-types';import { connect } from "react-redux";
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles, withTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

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
/*
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: 100,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    segment: {
        flexGrow: 1,
        marginBottom: 16,
        marginTop: 16,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});
*/
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

const ApiDataItem = props => (
    <React.Fragment>
        <Typography gutterBottom variant="h6" component="div">{props.literals.common.stream}</Typography>
        <Typography gutterBottom variant="subheading" component="div">{props.apiitem.description}</Typography>
        <ApiDataItemChildText apiitem={props.apiitem} childnode="learning_targets" childval="target_name" />
        <ApiDataItemChild apiitem={props.apiitem} childnode="tags" childval="tag" />
        <Breadcrumbs separator="-" arial-label="Breadcrumb">
            {
                props.apiitem.learningPractices.map((learningPractice, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Link color="inherit" href="">
                                {learningPractice.learningPractice.name}
                            </Link>
                        </React.Fragment>
                    )
                })
            }
        </Breadcrumbs>
    </React.Fragment>
);
const ApiDataItemChildText = props => (
    props.apiitem[props.childnode] == null ? (
        <React.Fragment key={props.index}>
            <Typography gutterBottom variant="button" component="div">
                ...
            </Typography>
        </React.Fragment>
    ) : (
            props.apiitem[props.childnode].map((item, index) => (
                <React.Fragment key={index}>
                    <Typography gutterBottom variant="body1" component="div">
                        {item[props.childval] ? item[props.childval] : item}
                    </Typography>
                </React.Fragment>
            ))
        )
); const ApiDataItemChild = props => (
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

class DOLStreams extends React.Component {
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
        fetch("/api/learningStreams") // dol/api/gettest // /api/learning_point
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
        const link_group_streams = [
            { "href": "/view/stream", "title": literals.common.explore + " " + literals.common.stream },
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
                        key={index}
                        title={apiitem[0].name}
                        cover={window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + apiitem[0].image}//"http://placeimg.com/640/360/tech"
                        text={<ApiDataItem apiitem={apiitem[0]} index={index} literals={literals} />}
                        links={[
                            { "href": "/explore/practices?streamId=" + apiitem[0].id, "title": literals.common.explore + " " + literals.common.stream },
                        ]}
                        xs={12} sm={4} md={4}
                        fetchid={apiitem[0].id}
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

DOLStreams.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLStreams));

/**
 *                 <Grid container spacing={16}>
                    <Grid item sm={12}>
                        <AppBar className={classNames(classes.segment)} position="static" color="default">
                            <Toolbar>
                                <Typography justify="center" variant="h5" component="div">
                                    {literals.common.practices}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Grid>
 */




