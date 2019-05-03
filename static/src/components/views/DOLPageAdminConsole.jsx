import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import store from "../../store"

import { loadAdminConsoleContent } from '../../actions/FecthAdminConsoleContent'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import DOLModeratorContentTable from "../organisms/DOLModeratorContentTable"
import Snackbar from '../molecules/Snackbar'

const styles = theme => ({
    bodyUnit: {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing.unit * 2}px`,
        [theme.breakpoints.up('md')]: {
            padding: "50px 90px",
        },
    },
});

store.dispatch(loadAdminConsoleContent())

const mapStateToProps = state => {
    return {
        literals: state.literals,
        adminConsoleContent: state.adminConsoleContent,
        notice: state.notice
    };
};


class DOLPageAdminConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: ''
        }
    }

    render() {
        const { classes, adminConsoleContent, notice } = this.props
        const content = () => {
            if(adminConsoleContent.length){
                return adminConsoleContent
            } else {
                return [
                    {
                        id: 1,
                        timestamp: '2019-04-24 15:16:17.123',
                        link: 'https://google.ca',
                        categories: ['AI / Machine Learning', 'Data Analysis'],
                    }
                ]
            }
        }
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.bodyUnit}>
                    <div className={classes.bodyContent}>
                        <Snackbar notice={notice} />
                        <DOLModeratorContentTable rows={content()} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageAdminConsole.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageAdminConsole))
