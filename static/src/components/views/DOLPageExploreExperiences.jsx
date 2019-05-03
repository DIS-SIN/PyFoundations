import { connect } from "react-redux";
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LabelIcon from '@material-ui/icons/Label';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import classNames from 'classnames';
import AjaxTest from "../../samples/AjaxTest";
import DOLExperiences from "../organisms/DOLExperiences";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

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
        backgroundColor: theme.palette.background.paper,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
        paddingTop: 16,
        backgroundColor: theme.palette.background.paper,
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
});

class DOLPageExploreExperiences extends React.Component {
    


    render() {
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/explore", "title": literals.common.explore },
        ];

        //  {apiDataItem}
        const returnFragment = (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    title={literals.pages.experiences.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.experiences.hero.text)}
                    </React.Fragment>}
                />
                <div className={classes.bodyUnit}>
                    <div className={classes.bodyContent}>
                        <DOLExperiences />
                    </div>
                </div>
            </React.Fragment>
        )
        return returnFragment;

    }
}

DOLPageExploreExperiences.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLPageExploreExperiences));

