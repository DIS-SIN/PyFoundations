// redux state
import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import ProgressBarLinear from "../atoms/ProgressBarLinear";
import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Link } from 'react-router-dom';
import GridTextGroup from "../molecules/GridTextGroup";
import GridProfileCard from "../molecules/GridProfileCard";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Checkbox from '@material-ui/core/Checkbox';
import DashboardExample from '../../samples/DashboardExample';

const styles = theme => ({
    layout: {
        width: 'auto',
        //marginLeft: theme.spacing.unit * 3,
        //marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        backgroundColor: theme.palette.background.paper,
        margin: 0,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    avatar: {
        margin: 'auto',
        width: 160,
        height: 160,
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    bodyUnit: {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing.unit * 2}px`,
        [theme.breakpoints.up('md')]: {
            padding: "25px 90px",
        },
    },
    bodyContent: {
        //maxWidth: 900,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        paddingTop: 0,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stream: null,
        };
    }
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    render() {
        const { literals, location, classes } = this.props;
        const { stream } = this.state;
        const progressMain = 80;

        const link_group_hero = [
            { "href": "/profile/update", "title": literals.pages.profile.hero.setgoals },
            { "href": "/profile/update", "title": literals.pages.profile.hero.updateprofile },
        ];
        const stream_form_control_fields = [
            { "value": "0", "label": literals.organisms.primaryactionpanel.ctrl.digitalgov, "checked": stream },
            { "value": "1", "label": literals.organisms.primaryactionpanel.ctrl.digitalliteracy, "checked": stream },
            { "value": "2", "label": literals.organisms.primaryactionpanel.ctrl.design, "checked": stream },
            { "value": "3", "label": literals.organisms.primaryactionpanel.ctrl.leadership, "checked": stream },
            { "value": "4", "label": literals.organisms.primaryactionpanel.ctrl.disruptivetech, "checked": stream },
            { "value": "5", "label": literals.organisms.primaryactionpanel.ctrl.dataanalysis, "checked": stream },
            { "value": "6", "label": literals.organisms.primaryactionpanel.ctrl.aiml, "checked": stream },
            { "value": "7", "label": literals.organisms.primaryactionpanel.ctrl.devops, "checked": stream },
            { "value": "8", "label": literals.organisms.primaryactionpanel.ctrl.development, "checked": stream },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    title={literals.pages.profile.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.profile.hero.text)}
                        <ProgressBarLinear completed={progressMain} />
                    </React.Fragment>}
                    links={link_group_hero}
                />
                <div className={classes.bodyUnit}>
                    <div className={classes.bodyContent}>
                        <Grid container spacing={0} >
                            <Grid container spacing={16} >
                                <GridProfileCard
                                    xs={12} sm={12} md={12} lg={12}
                                    title="Elle Weasela"
                                    text={<React.Fragment>
                                        <Grid container spacing={0} alignItems="center">
                                            <Grid container spacing={16} alignItems="center" justify="center">
                                                <Grid item xs={12} sm={6}>
                                                    <Grid container spacing={0} alignItems="center" justify="center" alignContent="center">
                                                        <Grid item xs={12} sm={4}>
                                                            <Avatar alt="Avatar" src="https://placeimg.com/640/480/animals" className={classes.avatar} >
                                                                EW
                                                            </Avatar>
                                                        </Grid>
                                                        <Grid item xs={12} sm={8}>
                                                            <Typography variant="subtitle1" component="div">
                                                                learner@email.com
                                                            </Typography>
                                                            <Typography variant="subtitle1" component="div">CSPS, DIS/DAT</Typography>
                                                            <Typography variant="subtitle1" component="div">Ottawa, ON</Typography>
                                                            <Button component={Link} to="/profile/edit" variant="outlined" >
                                                                {literals.pages.profile.editprofile}
                                                            </Button>

                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>

                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1" component="span">
                                                            <b>4</b> {literals.common.streams}
                                                        </Typography>
                                                        <ProgressBarLinear completed={progressMain} />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1" component="span">
                                                            <b>22</b> {literals.common.practices}
                                                        </Typography>
                                                        <ProgressBarLinear completed={progressMain} />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1" component="span">
                                                            <b>260</b> {literals.common.experiences}
                                                        </Typography>
                                                        <ProgressBarLinear completed={progressMain} />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12}>
                                                    <Grid item xs={12}>
                                                        <FormControl required component="fieldset" className={classes.formControl}>
                                                            <FormLabel component="legend">{literals.common.streams}</FormLabel>
                                                            <FormGroup row>
                                                                {stream_form_control_fields.map((ctrl, index) => (
                                                                    <FormControlLabel
                                                                        key={index}
                                                                        control={
                                                                            <Checkbox

                                                                                checked={ctrl.checked}
                                                                                onChange={this.handleChangeCheckbox(ctrl.value)}
                                                                                value={ctrl.value}
                                                                            />
                                                                        }
                                                                        label={ctrl.label}
                                                                    />
                                                                ))}
                                                            </FormGroup>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                    } />

                                <GridProfileCard
                                    title={"Overall Progress for 2019"}
                                    cover="https://placeimg.com/640/480/tech"
                                    text={
                                        <React.Fragment>
                                            <Typography variant="subtitle2" component="span">
                                                500 / 75000 pts
                                            </Typography>
                                            <ProgressBarLinear completed={progressMain} />
                                            <Typography variant="caption">
                                                Interests: Bias &amp; Ethics | Deep Learning / Neural Networks | Reinforcement Learning | Unsupervised Learning
                                            </Typography>
                                        </React.Fragment>
                                    } />
                                <GridProfileCard
                                    title={" AI / Machine Learning - Current Skill: Experienced"}
                                    cover="https://placeimg.com/640/480/nature"
                                    text={
                                        <React.Fragment>
                                            <Typography variant="subtitle2" component="span">
                                                500 / 75000 pts
                                            </Typography>
                                            <ProgressBarLinear completed={progressMain} />
                                            <Typography variant="caption">
                                                Interests: Bias &amp; Ethics | Deep Learning / Neural Networks | Reinforcement Learning | Unsupervised Learning
                                            </Typography>
                                        </React.Fragment>
                                    } />
                                <GridProfileCard
                                    title={" Digital Government - Current Skill: Experienced"}
                                    cover="https://placeimg.com/640/480/any"
                                    text={
                                        <React.Fragment>

                                            <Typography variant="subtitle2" component="span">
                                                500 / 75000 pts
                                            </Typography>
                                            <ProgressBarLinear completed={progressMain} />
                                            <Typography variant="caption">
                                                Interests: Bias &amp; Ethics | Deep Learning / Neural Networks | Reinforcement Learning | Unsupervised Learning
                                            </Typography>
                                        </React.Fragment>
                                    } />




                                <GridProfileCard
                                    xs={12} sm={12} md={12} lg={12}
                                    title="Elle Weasela"
                                    text={<React.Fragment>
                                        <DashboardExample />
                                    </React.Fragment>
                                    } />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

DOLPageUserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageUserProfile));

{/*
                                    Experiences
                                    Busrides - Episode 2
                                    Digital Government > Empowering People | Agile | Open Standards & Solutions |
                                    Value: 2
                                    Time: 1
                                    Difficulty: 2
                                    Comments: Entertaining
                                    Tags: Digital Leadership | Academy | AI Translation

                                    Learning Library
                                    Will sort by category

                                    Busrides - Episode 2 (2019-02-04) | Link 
                            */}
{/*
                            <Grid container spacing={16}>
                                <Grid item xs={4}>
                                    <img
                                        alt="post"
                                        style={{ width: '100%' }}
                                        src="https://placeimg.com/640/480/tech"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <img
                                        alt="post"
                                        style={{ width: '100%' }}
                                        src="https://placeimg.com/640/480/nature"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <img
                                        alt="post"
                                        style={{ width: '100%' }}
                                        src="https://placeimg.com/640/480/any"
                                    />
                                </Grid>
                            </Grid>*/}