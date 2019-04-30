import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DOLModeratorContentTable from "../organisms/DOLModeratorContentTable";

import axios from 'axios';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const styles = theme => ({
    bodyUnit: {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing.unit * 2}px`,
        [theme.breakpoints.up('md')]: {
            padding: "50px 90px",
        },
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals,
    };
};

class DOLPageAdminConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [
                {
                  id: 1,
                  timestamp: '2019-04-24 15:16:17.123',
                  link: 'https://google.ca',
                      categories: ['AI / Machine Learning', 'Data Analysis'],
                }
            ],
        }
    }

    componentDidMount(){
        // this.fetchContent();
    }

    fetchContent(){
        axios.get('/api/console/content').then(
            response => {
                this.setState({rows: response.data})
            }
        ).catch(
            error => {
                this.setState({error: {status: "error", message: error.message}})
            }
        )
    }

    render() {
        const { literals, location, classes } = this.props;
        const { rows } = this.state;
        const link_group_hero = [
            { "href": "/home", "title": literals.pages.stub.hero.home },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.bodyUnit}>
                    <div className={classes.bodyContent}>
                        <DOLModeratorContentTable rows={rows} />
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
export default connect(mapStateToProps)(withStyles(styles)(DOLPageAdminConsole));
