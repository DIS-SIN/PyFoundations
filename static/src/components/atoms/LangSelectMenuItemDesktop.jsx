import React from "react";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import loadLangPack from "./i18n";
import { loadLiterals } from "../../store/literals";
import { loadLang } from "../../store/lang";
import store from "../../store";
import LanguageIcon from '@material-ui/icons/Language';

const mapStateToProps = state => {
    return {
        literals: state.literals,
        lang: state.lang
    };
};

const changeLanguage = lng => {
    const langpack = loadLangPack(lng);
    store.dispatch(loadLiterals(langpack));
    store.dispatch(loadLang(lng));
};

class LangSelectMenuItemDesktop extends React.Component {
render() {
        const { literals, location } = this.props;
        const newLang = () => {
            let currentLang = location.pathname.match(/^\/(en|fr)(.*)/)
            let lang, href, title
            if(currentLang[1] === "en"){
                href = "/fr" + currentLang[2]
                lang = "fr"
                title = literals.common.french
            } else {
                href = "/en" + currentLang[2]
                lang = "en"
                title = literals.common.english
            }
            return { href: href, title: title, lang: lang }
        }

        const link = newLang()

        // WARN: Brittle, there's a better way to do this
        return (
            <React.Fragment>
                <Button color="inherit" component={Link} to={link.href} onClick={() => changeLanguage(link.lang)}>
                    <LanguageIcon /> {link.title}
                </Button>
            </React.Fragment>
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(LangSelectMenuItemDesktop);
