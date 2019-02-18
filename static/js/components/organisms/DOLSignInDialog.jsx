import React from 'react';
import PropTypes from 'prop-types';
import Promise from 'promise-polyfill';
import "whatwg-fetch";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class DOLSignInDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        open: false,
        email: '',
        password: ''
    };

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        const response = await fetch('/api/test/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "signin": {
                    "type": "normal",
                    "user": email,
                    "cred": password
                }
            }),
        });
        const body = await response.json();//response.text();
        alert(JSON.stringify(body, null, 2));
        //this.setState({
        //    responseToPost: body
        //});
        this.handleClose();
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { email, password } = this.state;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    SIGN IN
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Digital Online Learning - Sign In</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <strong>Digital Online Learning is more than a catalog.</strong> By signing in you can create a <strong>personalized</strong> treasure trove of <strong>digital knowledge and learning points</strong>.
                            If you just want to browse, that works too. All the knowledge collected by the keen learners in DOL are available to you.
                        </DialogContentText>
                        <main className={classes.main}>
                            <CssBaseline />
                            <Paper className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Enter Sign In Credentials
                                </Typography>
                                <form className={classes.form} onSubmit={this.handleSubmit}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="email">Email Address</InputLabel>
                                        <Input
                                            id="email" name="email"
                                            autoComplete="email"
                                            autoFocus
                                            value={email}
                                            onChange={this.onChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input
                                            id="password" name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={this.onChange} />
                                    </FormControl>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Sign in
                                    </Button>
                                </form>
                            </Paper>
                        </main>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


DOLSignInDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DOLSignInDialog);