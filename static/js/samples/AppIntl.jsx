import React, { Component, Suspense } from 'react';
import { loadLiterals } from "../store/literals";
import store from "../store";
import loadLang from "../components/atoms/i18n";

// redux state
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import LanguageIcon from '@material-ui/icons/Language';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

// hook to change language, fires a state change
const changeLanguage = lng => {
    const lang = loadLang(lng);
    store.dispatch(loadLiterals(lang));
};

const MyComponent = props => (
    <Typography component="p">
        {props.literals.appintl.description.part1}
    </Typography>
);

const Page = props => (
    <div className="AppIntl">
        <div className="App-header">
            <Button
                variant="contained" color="primary"
                onClick={() => changeLanguage('fr')}>
                <LanguageIcon /> Français
            </Button>
            <Button
                variant="contained" color="primary"
                onClick={() => changeLanguage('en')}>
                <LanguageIcon /> English
            </Button>
        </div>
        <div className="App-intro">
            <MyComponent literals={props.literals} />
        </div>
        <div>
            <Typography component="p">
                {props.literals.appintl.description.part2}
            </Typography>
        </div>
    </div>
);

class AppIntl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { literals } = this.props;
        return (
            <Page literals={literals} />
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(AppIntl);