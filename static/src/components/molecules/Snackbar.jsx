import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    notice: {
        marginTop: "25px",
        marginBottom : "25px",        
    }
});


class Snackbar extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          open: true
      }
  }

  componentWillReceiveProps(){
      this.setState({open: true})
  }

  render() {
    const { classes, notice } = this.props;
    const { open } = this.state;
    if(notice.status && notice.message && open){
        const { status, message } = notice;
        const Icon = variantIcon[status];
        return (
            <div>
                  <SnackbarContent
                      aria-describedby="client-snackbar"
                      message={
                        <span id="client-snackbar" className={classes.message}>
                          <Icon className={classNames(classes.icon, classes.iconVariant, classes.content)} />
                          {message}
                        </span>
                      }
                      className={classNames(classes[status], classes.notice)}
                      action={[
                          <IconButton
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          className={classes.close}
                          onClick={e => this.setState({open: false})}
                          >
                              <CloseIcon className={classes.icon} />
                          </IconButton>,
                      ]}
                  />
            </div>
          );
    } else {
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
  }
}

Snackbar.propTypes = {
  classes: PropTypes.object,
  notice: PropTypes.object,
};

export default withStyles(styles)(Snackbar);