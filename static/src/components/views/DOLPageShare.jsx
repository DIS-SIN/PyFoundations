import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";
import GridInfoCard from "../molecules/GridInfoCard";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { connect } from "react-redux";
import DOLAddContentFormContainer from "../organisms/DOLAddContentFormContainer";

const styles = theme => ({
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
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing.unit * 2}px`,
    },
    heroContent: {
        //maxWidth: 900,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        paddingTop: 0,
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageShare extends React.Component {
    

    render() {
        const { literals, location, classes } = this.props;


        return (
            <React.Fragment>
                <CssBaseline />
                {/*signin={<Grid key="signindialog" item><DOLSignInDialog /></Grid>}*/}
                <HeroHeader

                    title={literals.pages.share.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.share.hero.text)}
                    </React.Fragment>}
                />
                {/*<div className={classNames(classes.layout, classes.cardGrid)}>*/}
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <DOLAddContentFormContainer />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageShare.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageShare));
