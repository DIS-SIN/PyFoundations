import React, { Component } from "react";

import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        welcome: "Hello!",
        knownmessage: "Welcome back.",
        unknownmessage: "Please Sign Up.",
        changelanguage: "Français"
    },
    fr: {
        welcome: "Bonjour!",
        knownmessage: "Bienvenue.",
        unknownmessage: "Inscrivez vous s'il vous plait.",
        changelanguage: "English"
    }
});

const GuestGreeting = (props) => {
    return (
        <h1>{strings.welcome} {strings.unknownmessage}</h1>
    );
}
const UserGreeting = (props) => {
    return (
        <h1>{strings.welcome} {strings.knownmessage}</h1>
    );
}

class Greeting extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleCanadianOfficialLanguage = () => {
        if (strings.getLanguage() == "en") {
            strings.setLanguage('fr');
            this.setState({});
        } else {
            strings.setLanguage('en');
            this.setState({});
        }
    }

    render() {
        const { isLoggedIn } = this.props;
        //const { currentLang } = this.state;
        let greetingFragment = null;
        if (isLoggedIn) {
            greetingFragment = <UserGreeting />;
        } else {
            greetingFragment = <GuestGreeting />;
        }

        return (
            <div className="greetingBlock">
                {greetingFragment}
                <button onClick={this.toggleCanadianOfficialLanguage}>
                    {strings.changelanguage}
                </button>
            </div>
        )
    }
}

export default Greeting;