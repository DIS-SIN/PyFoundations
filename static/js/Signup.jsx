import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
//import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import AppIntl from './AppIntl';
import LoginControl from './LoginControl';
import MUIButton from './MUIButton';
import Clock from './Clock';
import Toggle from './Toggle';
import AjaxTest from './AjaxTest';
import ApiTest from './ApiTest';
import PaperSheet from './PaperSheet';
//import Back from './common/Back';
//const backgroundShape = require('../images/shape.svg');

//const logo = require('../images/logo.svg');

const numeral = require('numeral');
numeral.defaultFormat('0');

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary['A100'],
        overflow: 'hidden',
        background: `url('/static/images/shape.svg') no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        marginTop: 20,
        padding: 20,
        paddingBottom: 500
    },
    fabButton: {
        position: 'fixed',
        zIndex: 1,
        bottom: 70,
        left: 'auto',
        right: 20,
        margin: '0 auto',
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    grid: {
        margin: `0 ${theme.spacing.unit * 2}px`
    },
    smallContainer: {
        width: '60%'
    },
    bigContainer: {
        width: '80%'
    },
    logo: {
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'center'
    },
    stepContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    stepGrid: {
        width: '80%'
    },
    buttonBar: {
        marginTop: 32,
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: theme.palette.primary['A100']
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    outlinedButton: {
        textTransform: 'uppercase',
        margin: theme.spacing.unit
    },
    stepper: {
        backgroundColor: 'transparent'
    },
    paper: {
        padding: theme.spacing.unit * 3,
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    topInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 42
    },
    formControl: {
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    }
})


import { connect } from "react-redux";
import Table from './Table';
import Form from './Form';
import NavBar from './NavBar';
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const getSteps = () => {
    return [
        'User',
        'Signin',
        'Permission'
    ];
}

const IntlComponentA = props => {
    return (
        <Typography variant="h5" gutterBottom>
            {props.literals.app.title}
        </Typography>
    )
};

const HeaderGreeting = props => {
    return (
        <Typography variant="h5" gutterBottom>
            {props.literals.app.headergreeting}
        </Typography>
    );
}

const HeaderTagLine = props => {
    return (
        <Typography component="p">
            {props.literals.app.headertagline}
        </Typography>
    );
}

const FormHeader = props => {
    return (
        <Typography variant="h5" gutterBottom>
            {props.literals.app.formheader}
        </Typography>
    );
}

class Signup extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        activeStep: 0,
        receivingAccount: '',
        termsChecked: false,
        loading: true,
        tableContent: [ /* { "fieldName": "Javascript", "fieldValue":".js" }, */]
    };

    componentDidMount() {

    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
        if (this.state.activeStep === 2) {
            setTimeout(() => alert('End of Sample'), 5000) // this.props.history.push('/home')
        }
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleTerms = event => {
        this.setState({ termsChecked: event.target.checked });
    };

    stepActions() {
        if (this.state.activeStep === 0) {
            return 'Sign in';
        }
        if (this.state.activeStep === 1) {
            return 'Next';
        }
        if (this.state.activeStep === 2) {
            return 'Accept';
        }
        return 'Next';
    }

    removeTableContent = index => {
        const { tableContent } = this.state;

        this.setState({
            tableContent: tableContent.filter((tableContent, i) => {
                return i !== index;
            })
        });
    }

    handleSubmit = tableContentItem => {
        this.setState({ tableContent: [...this.state.tableContent, tableContentItem] });
    }

    render() {

        const { classes, literals } = this.props;
        const steps = getSteps();
        const { activeStep, loading, tableContent } = this.state;

        // <Back />
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>

                    <Grid container justify="center">
                        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                            <Grid item xs={12}>
                                <div className={classes.logo}>
                                    <img width={100} height={100} src="/static/images/logo.svg" />
                                </div>
                                <div className={classes.stepContainer}>
                                    <div className={classes.stepGrid}>
                                        <Stepper classes={{ root: classes.stepper }} activeStep={activeStep} alternativeLabel>
                                            {steps.map(label => {
                                                return (
                                                    <Step key={label}>
                                                        <StepLabel>{label}</StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>
                                    </div>
                                    {activeStep === 0 && (
                                        <div className={classes.smallContainer}>
                                            <Paper className={classes.paper}>
                                                <div>
                                                    <div style={{ marginBottom: 32 }}>
                                                        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }} gutterBottom>
                                                            Select
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            A item to select
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography style={{ textTransform: 'uppercase', marginBottom: 20 }} color='secondary' gutterBottom>
                                                            First options
                                                        </Typography>
                                                        <FormControl variant="outlined" className={classes.formControl}>
                                                            <Select
                                                                value={this.state.receivingAccount}
                                                                onChange={this.handleChange}
                                                                input={
                                                                    <OutlinedInput
                                                                        labelWidth={100}
                                                                        name="receivingAccount"
                                                                    />
                                                                }
                                                            >
                                                                <MenuItem value="">
                                                                    <em>Select some option</em>
                                                                </MenuItem>
                                                                <MenuItem value={'first'}>Option 1</MenuItem>
                                                                <MenuItem value={'second'}>Other option</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                    )}
                                    {activeStep === 1 && (
                                        <div className={classes.smallContainer}>
                                            <Paper className={classes.paper}>
                                                <Grid item container xs={12}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1" gutterBottom>
                                                            Sign & confirm
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            Sign and confirm loan agreement
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            One text to explain that
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </div>
                                    )}
                                    {activeStep === 2 && (
                                        <div className={classes.smallContainer}>
                                            <Paper className={classes.paper}>
                                                <div>
                                                    <div style={{ marginBottom: 32 }}>
                                                        <Typography variant="subtitle1" gutterBottom>
                                                            Permissions
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            We need some permissions to proceed.
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography color='secondary' gutterBottom>
                                                            Accounts
                                                        </Typography>
                                                        <List component="nav">
                                                            <ListItem>
                                                                <ListItemIcon>
                                                                    <DoneIcon />
                                                                </ListItemIcon>
                                                                <ListItemText inset primary="0297 00988200918" />
                                                            </ListItem>
                                                            <ListItem>
                                                                <ListItemIcon>
                                                                    <DoneIcon />
                                                                </ListItemIcon>
                                                                <ListItemText inset primary="0297 00988200920" />
                                                            </ListItem>
                                                        </List>
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                    )}
                                    {activeStep === 3 && (
                                        <div className={classes.bigContainer}>
                                            <Paper className={classes.paper}>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <div style={{ width: 380, textAlign: 'center' }}>
                                                        <div style={{ marginBottom: 32 }}>
                                                            <Typography variant="h6" style={{ fontWeight: 'bold' }} gutterBottom>
                                                                Collecting your data
                                                            </Typography>
                                                            <Typography variant="body2" gutterBottom>
                                                                We are processing your request
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Fade
                                                                in={loading}
                                                                style={{
                                                                    transitionDelay: loading ? '800ms' : '0ms',
                                                                }}
                                                                unmountOnExit
                                                            >
                                                                <CircularProgress style={{ marginBottom: 32, width: 100, height: 100 }} />
                                                            </Fade>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                    )}
                                    {activeStep !== 3 && (
                                        <div className={classes.buttonBar}>
                                            {activeStep !== 2 ? (
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.backButton}
                                                    size='large'
                                                >
                                                    Back
                                                </Button>
                                            ) : (
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={this.handleBack}
                                                        className={classes.backButton}
                                                        size='large'
                                                    >
                                                        Cancel
                                                    </Button>
                                                )}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                size='large'
                                                style={this.state.receivingAccount.length ? { background: classes.button, color: 'white' } : {}}
                                                disabled={!this.state.receivingAccount.length}
                                            >
                                                {this.stepActions()}
                                            </Button>
                                        </div>
                                    )}

                                </div>
                            </Grid>
                        </Grid>
                        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                            <Grid item xs={12}>
                                <Link to='/home'>Digital Open Learning</Link>
                                <Link to='/reactshowcase'>React Showcase</Link>
                            </Grid>
                            <Grid item xs={12}>

                                <Paper className={classes.paper} elevation={1}>
                                    <NavBar />
                                    <div>
                                        <AppIntl />
                                        <LoginControl />
                                    </div>
                                    <div>
                                        <Clock />
                                    </div>
                                    <div>
                                        <IntlComponentA literals={literals} />
                                        <HeaderGreeting literals={literals} />
                                        <HeaderTagLine literals={literals} />
                                    </div>
                                    <div>
                                        <Toggle />
                                        <Toggle />
                                    </div>
                                    <div>
                                        <FormHeader literals={literals} />
                                        <Form
                                            handleSubmit={this.handleSubmit}
                                        />
                                        <Table
                                            tableContentData={tableContent}
                                            removeTableContent={this.removeTableContent}
                                        />
                                    </div>
                                    <div>
                                        <AjaxTest />
                                        <ApiTest />
                                    </div>

                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                </div>
            </React.Fragment>
        )
    }
}
/*
<MUIButton />
*/
//export default withRouter(withStyles(styles)(Signup))
export default connect(mapStateToProps)(withStyles(styles)(Signup));
// redux connect state//
