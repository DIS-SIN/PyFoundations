import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import { connect } from "react-redux";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ScrollToTop from "../atoms/ScrollToTop";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const styles = theme => ({
    appBar: {
        position: 'fixed',
        backgroundColor: '#232323',
    },
    headerAppbarDark: {
        backgroundColor: '#232323',
    },
    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    fabButton: {
        position: 'fixed',
        zIndex: 1,
        bottom: 35,
        left: 'auto',
        right: 35,
        margin: '0 auto',
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
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
})

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DOLPrimaryActionPanel extends React.Component {
    state = {
        open: false,
        accessible: false,
        clear: false,
        entertaining: false,
        relevant: false,
        informative: false,
        insightful: false,
        useful: false,
        verb: null,
        stream: null,
        valuable: null,
        difficulty: null,
        duration: null,
        url: "",
        tag1: "",
        tag2: "",
        tag3: "",
    };

    handleClear = () => {
        //console.log(this.state.stream);
        this.setState({
            accessible: false,
            clear: false,
            entertaining: false,
            relevant: false,
            informative: false,
            insightful: false,
            useful: false,
            verb: null,
            stream: null,
            valuable: null,
            difficulty: null,
            duration: null,
            url: "",
            tag1: "",
            tag2: "",
            tag3: "",
        });
    };
    handleChangeText = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleChangeRadio = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };



    render() {
        //console.log("render: ", this.state.stream);
        const { classes, literals } = this.props;
        const { accessible, clear, entertaining, relevant, informative,
            insightful, useful, verb, stream, valuable, difficulty, duration,
            url, tag1, tag2, tag3 } = this.state;

        const verb_form_control_fields = [
            { "value": "read", "label": literals.organisms.primaryactionpanel.ctrl.read, "checked": verb },
            { "value": "watch", "label": literals.organisms.primaryactionpanel.ctrl.watch, "checked": verb },
            { "value": "listen", "label": literals.organisms.primaryactionpanel.ctrl.listen, "checked": verb },
            { "value": "participate", "label": literals.organisms.primaryactionpanel.ctrl.participate, "checked": verb },
            { "value": "practice", "label": literals.organisms.primaryactionpanel.ctrl.practice, "checked": verb },
            { "value": "study", "label": literals.organisms.primaryactionpanel.ctrl.study, "checked": verb },
            { "value": "do", "label": literals.organisms.primaryactionpanel.ctrl.do, "checked": verb },
        ];
        const impression_form_control_fields = [
            { "value": "accessible", "label": literals.organisms.primaryactionpanel.ctrl.accessible, "checked": accessible },
            { "value": "clear", "label": literals.organisms.primaryactionpanel.ctrl.clear, "checked": clear },
            { "value": "entertaining", "label": literals.organisms.primaryactionpanel.ctrl.entertaining, "checked": entertaining },
            { "value": "relevant", "label": literals.organisms.primaryactionpanel.ctrl.participate, "checked": relevant },
            { "value": "informative", "label": literals.organisms.primaryactionpanel.ctrl.informative, "checked": informative },
            { "value": "insightful", "label": literals.organisms.primaryactionpanel.ctrl.insightful, "checked": insightful },
            { "value": "useful", "label": literals.organisms.primaryactionpanel.ctrl.useful, "checked": useful },
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
        const duration_form_control_fields = [
            { "value": "0d0h15m", "label": literals.organisms.primaryactionpanel.ctrl.times.few, "checked": duration },
            { "value": "0d0h60m", "label": literals.organisms.primaryactionpanel.ctrl.times.some, "checked": duration },
            { "value": "0d3h0m", "label": literals.organisms.primaryactionpanel.ctrl.times.hours, "checked": duration },
            { "value": "3d0h0m", "label": literals.organisms.primaryactionpanel.ctrl.times.days, "checked": duration },
            { "value": "21d0h0m", "label": literals.organisms.primaryactionpanel.ctrl.times.weeks, "checked": duration },
        ];
        const valuable_form_control_fields = [
            { "value": "0", "label": literals.organisms.primaryactionpanel.ctrl.value.little, "checked": valuable },
            { "value": "1", "label": literals.organisms.primaryactionpanel.ctrl.value.some, "checked": valuable },
            { "value": "2", "label": literals.organisms.primaryactionpanel.ctrl.value.solid, "checked": valuable },
            { "value": "3", "label": literals.organisms.primaryactionpanel.ctrl.value.good, "checked": valuable },
            { "value": "4", "label": literals.organisms.primaryactionpanel.ctrl.value.great, "checked": valuable },
        ];
        const difficulty_form_control_fields = [
            { "value": "0", "label": literals.organisms.primaryactionpanel.ctrl.difficulty.easy, "checked": difficulty },
            { "value": "1", "label": literals.organisms.primaryactionpanel.ctrl.difficulty.normal, "checked": difficulty },
            { "value": "2", "label": literals.organisms.primaryactionpanel.ctrl.difficulty.hard, "checked": difficulty },
            { "value": "3", "label": literals.organisms.primaryactionpanel.ctrl.difficulty.expert, "checked": difficulty },
        ];
        return (
            <div>
                <ScrollToTop />
                <Fab color="secondary" aria-label="Add" onClick={this.handleClickOpen} className={classes.fabButton}>
                    <AddIcon />
                </Fab>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar className={classes.headerAppbarDark}>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                {literals.organisms.primaryactionpanel.title}
                            </Typography>
                            <Button color="inherit" onClick={this.handleClear}>
                                {literals.common.clear}
                            </Button>
                            <Button color="inherit" onClick={this.handleClose}>
                                {literals.common.save}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        <DialogTitle id="form-dialog-title">{literals.organisms.primaryactionpanel.formtitle}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={12}>
                                    <DialogContentText>
                                        {literals.organisms.primaryactionpanel.urltitle}
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="url"
                                        label={literals.organisms.primaryactionpanel.urllabel}
                                        type="url"
                                        fullWidth
                                        value={url}
                                        onChange={this.handleChangeText('url')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        {literals.organisms.primaryactionpanel.verbtitle}
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">{literals.organisms.primaryactionpanel.verblabel}</FormLabel>
                                        <RadioGroup
                                            aria-label={literals.organisms.primaryactionpanel.verblabel}
                                            name="verb"
                                            className={classes.group}
                                            value={verb}
                                            onChange={this.handleChangeRadio('verb')}
                                        >
                                            {verb_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        {literals.organisms.primaryactionpanel.impressiontitle}
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">{literals.organisms.primaryactionpanel.impressionlabel}</FormLabel>
                                        <FormGroup>
                                            {impression_form_control_fields.map((ctrl, index) => (
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
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        {literals.organisms.primaryactionpanel.streamtitle}
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">{literals.organisms.primaryactionpanel.streamlabel}</FormLabel>
                                        <RadioGroup
                                            aria-label={literals.organisms.primaryactionpanel.streamlabel}
                                            name="stream"
                                            className={classes.group}
                                            value={stream}
                                            onChange={this.handleChangeRadio('stream')}
                                        >
                                            {stream_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        {literals.organisms.primaryactionpanel.durationtitle}
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">{literals.organisms.primaryactionpanel.durationlabel}</FormLabel>
                                        <RadioGroup
                                            aria-label={literals.organisms.primaryactionpanel.durationlabel}
                                            name="duration"
                                            className={classes.group}
                                            value={duration}
                                            onChange={this.handleChangeRadio('duration')}
                                        >
                                            {duration_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        {literals.organisms.primaryactionpanel.valuabletitle}
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">{literals.organisms.primaryactionpanel.valuablelabel}</FormLabel>
                                        <RadioGroup
                                            aria-label={literals.organisms.primaryactionpanel.valuablelabel}
                                            name="valuable"
                                            className={classes.group}
                                            value={valuable}
                                            onChange={this.handleChangeRadio('valuable')}
                                        >
                                            {valuable_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        {literals.organisms.primaryactionpanel.difficultytitle}
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">{literals.organisms.primaryactionpanel.difficultylabel}</FormLabel>
                                        <RadioGroup
                                            aria-label={literals.organisms.primaryactionpanel.difficultylabel}
                                            name="difficulty"
                                            className={classes.group}
                                            value={difficulty}
                                            onChange={this.handleChangeRadio('difficulty')}
                                        >
                                            {difficulty_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <DialogContentText>
                                        {literals.organisms.primaryactionpanel.tagtitle}
                                    </DialogContentText>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="dense"
                                        id="tag1"
                                        label={literals.common.tag + " #1"}
                                        type="text"
                                        value={tag1}
                                        onChange={this.handleChangeText('tag1')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="dense"
                                        id="tag1"
                                        label={literals.common.tag + " #2"}
                                        type="text"
                                        value={tag2}
                                        onChange={this.handleChangeText('tag2')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="dense"
                                        id="tag1"
                                        label={literals.common.tag + " #3"}
                                        type="text"
                                        value={tag3}
                                        onChange={this.handleChangeText('tag3')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Button variant="contained" color="secondary" className={classes.button}>
                                        {literals.organisms.primaryactionpanel.saveexp}
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </div>
                </Dialog>
            </div >
        );
    }
}

DOLPrimaryActionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(withStyles(styles)(DOLPrimaryActionPanel));
