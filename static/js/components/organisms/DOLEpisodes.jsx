import React, { Component } from "react";
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

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};


// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    layout: {
        width: 'auto',
        marginLeft: 0,//theme.spacing.unit * 3,
        marginRight: 0,//theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
        paddingTop: 16,
        backgroundColor: theme.palette.background.paper,
        margin: 0,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
});

class DOLEpisodes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            learningpoints: [],
            post: "",
            response: "",
            responseToPost: ""
        };
    }

    // this fires when the component loads

    componentDidMount() {
        fetch("/api/episode") // dol/api/gettest // /api/learning_point
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result);
                    this.setState({
                        isLoaded: true,
                        apireturn: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        // end fetch
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const { error, isLoaded, apireturn, post, response, responseToPost } = this.state;
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/home", "title": literals.pages.stub.hero.home },
        ];

        if (error) {
            return (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.ajaxtest.error} {error.message}
                    </Typography>
                </Grid>
            );
        } else if (!isLoaded) {
            return (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.ajaxtest.loading}...
                    </Typography>
                </Grid>
            );
        } else {
            const api_state = apireturn.slice(0)[0].api_return;
            const api_content = apireturn.slice(0)[0].api_data;

            let apiDataItem = "";

            if (api_state === "success") {
                if (api_content.length === 0) {
                    //alert("N O D A T A, API OK " + api_content.length);
                    apiDataItem = (
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="headline" component="h2">
                                No Records Found
                            </Typography>
                        </Grid>
                    );
                } else {
                    //alert("S U C C E S S " + api_content.length);
                    apiDataItem = api_content.map((apiitem, index) => (
                        <Grid item xs={12} key={index}>
                            <Typography gutterBottom variant="headline" component="h2">
                                {apiitem.published_on}
                            </Typography>
                            <Typography gutterBottom variant="headline" component="div">
                                {apiitem.body}
                            </Typography>
                            {/*
                            {(
                                apiitem.tags == null ? (
                                    <React.Fragment key={index}>
                                        <Typography gutterBottom variant="headline" component="div">
                                            Add Tag...
                                        </Typography>
                                    </React.Fragment>
                                ) : (
                                        apiitem.tags.map((tag, index) => (
                                            <React.Fragment key={index}>
                                                <Typography gutterBottom variant="headline" component="div">
                                                <Chip
                                                    icon={<LabelIcon />}
                                                    label="Ajax Item"
                                                    color="primary"
                                                />

                                                </Typography>
                                            </React.Fragment>
                                        ))
                                    )
                            )}
                                        */}
                        </Grid >
                    ))
                }
            } else {
                apiDataItem = (
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="headline" component="h2">
                            API Failed
                        </Typography>
                    </Grid>
                );
            }

            //  {apiDataItem}
            const returnFragment = (
                <React.Fragment>
                    <Grid spacing={24} alignItems="center" justify="center" container>
                        {apiDataItem}
                    </Grid>
                </React.Fragment>
            )
            return returnFragment;
        }
    }
}

DOLEpisodes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLEpisodes));

/*
[{
    "api_data": [{
        "author": {
            "CreatedAt": "2019-01-29T16:14:28.674006Z",
            "Email": "cgeist7@gmail.com",
            "ID": 1,
            "IsAdmin": true,
            "LearnerProfile": {
                "CurrentYear": "2019",
                "Experiences": null,
                "ID": 0,
                "LearningTargets": {
                    "2019": [10000, 0]
                }
            },
            "Onboarded": true,
            "Password": "",
            "Streams": {
                "Data Analysis": {
                    "Description": "Data analysis is a process of inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information, informing conclusions, and supporting decision-making.",
                    "Expertise": 2,
                    "ID": 0,
                    "Image": {
                        "AddedOn": "0001-01-01T00:00:00Z",
                        "Description": "",
                        "ID": 0,
                        "Path": "https://s3.amazonaws.com/foundationsapp/static/data.jpg",
                        "Title": ""
                    },
                    "LearningTargets": {
                        "2019": [5000, 2300]
                    },
                    "Name": "Data Analysis",
                    "Practices": {
                        "Data Visualization": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Data Visualization",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Pandas / DataFrames": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Pandas / DataFrames",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Storytelling": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Storytelling",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        }
                    },
                    "Selected": true,
                    "Slug": "",
                    "Tags": null
                },
                "Development": {
                    "Description": "Software development is the process of conceiving, specifying, designing, programming, documenting, testing, and bug fixing involved in creating and maintaining applications, frameworks, or other software components.",
                    "Expertise": 2,
                    "ID": 0,
                    "Image": {
                        "AddedOn": "0001-01-01T00:00:00Z",
                        "Description": "",
                        "ID": 0,
                        "Path": "https://s3.amazonaws.com/foundationsapp/static/coding.jpeg",
                        "Title": ""
                    },
                    "LearningTargets": {
                        "2019": [10000, 2200]
                    },
                    "Name": "Development",
                    "Practices": {
                        "APIs": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "APIs",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Back-End Development": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Back-End Development",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Programming Languages": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Programming Languages",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Web Development": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Web Development",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        }
                    },
                    "Selected": true,
                    "Slug": "",
                    "Tags": null
                },
                "Digital Government": {
                    "Description": "\u201cThe use of digital technologies, as an integrated part of governments\u2019 modernisation strategies, to create public value. Relies on a digital government ecosystem comprised of government actors, non-governmental organisations, businesses, citizens\u2019 associations and individuals which supports the production of and access to data, services and content through interactions with the government.",
                    "Expertise": 3,
                    "ID": 0,
                    "Image": {
                        "AddedOn": "0001-01-01T00:00:00Z",
                        "Description": "",
                        "ID": 0,
                        "Path": "https://s3.amazonaws.com/foundationsapp/static/digital+government.png",
                        "Title": ""
                    },
                    "LearningTargets": {
                        "2019": [5000, 400]
                    },
                    "Name": "Digital Government",
                    "Practices": {
                        "Empowering People": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Empowering People",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Ethical & Responsible Use": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Ethical & Responsible Use",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Security & Privacy": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Security & Privacy",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "User-Centric Design": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "User-Centric Design",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        }
                    },
                    "Selected": true,
                    "Slug": "",
                    "Tags": null
                },
                "Digital Literacy": {
                    "Description": "",
                    "Expertise": 3,
                    "ID": 0,
                    "Image": null,
                    "LearningTargets": {
                        "2019": [5000, 500]
                    },
                    "Name": "Digital Literacy",
                    "Practices": {
                        "Digital Citizenship": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Digital Citizenship",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Using Information & Data": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Using Information & Data",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        }
                    },
                    "Selected": false,
                    "Slug": "",
                    "Tags": null
                },
                "Leadership": {
                    "Description": "Digital leadership is the strategic use of a company's digital assets to achieve business goals. Digital leadership can be addressed at both organizational and individual levels.",
                    "Expertise": 3,
                    "ID": 0,
                    "Image": {
                        "AddedOn": "0001-01-01T00:00:00Z",
                        "Description": "",
                        "ID": 0,
                        "Path": "https://s3.amazonaws.com/foundationsapp/static/leadership.jpg",
                        "Title": ""
                    },
                    "LearningTargets": {
                        "2019": [10000, 500]
                    },
                    "Name": "Leadership",
                    "Practices": {
                        "Agile Sponsorship": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Agile Sponsorship",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Digital Governance": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Digital Governance",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Fostering Innovation": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Fostering Innovation",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Leading Agile Projects": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Leading Agile Projects",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        },
                        "Leading Agile Teams": {
                            "Description": "",
                            "ID": 0,
                            "Image": null,
                            "Name": "Leading Agile Teams",
                            "Selected": false,
                            "Skills": null,
                            "Slug": "",
                            "Tags": null
                        }
                    },
                    "Selected": true,
                    "Slug": "",
                    "Tags": null
                }
            },
            "UpdatedAt": "0001-01-01T00:00:00Z",
            "UserName": "Chris Allison"
        },
        "banner_image": null,
        "body": "If you read our last post, you know we are interested in artificial intelligence. This week we want to talk a little bit about how we\u2019re actually using artificial intelligence within the Digital Academy to solve a very real problem or\u200a\u2014\u200aas marketing people would say\u200a\u2014\u200aembrace \u201can opportunity\u201d.\r\n\r\n\r\nLike all federal organizations, the Digital Academy has an obligation to publish everything in both official languages. Legally, and because it is the right thing to do, from an inclusion perspective.\r\n\r\n\r\nAs you can imagine, it\u2019s a non-trivial exercise. We decided to test the artificial intelligence built into YouTube to help us accelerate the process, and we thought you may be interested to know more.\r\n\r\n## Challenge accepted\r\nWe think that we can deliver content beginning to end, press publish in 48 hours. Think we\u2019re crazy? Let us convince you.\r\n\r\nGetting a transcript\u200a\u2014\u200a\r\n### AI and human touches\r\nWe start by shooting a video, then upload it to YouTube. YouTube\u2019s natural language processing will generate an auto transcript. So far, so good. Except, that we know that those transcripts are about 80% to 85 % good. YouTube know that too. So it gives us the ability to edit the transcript right there in the platform \u201ceditor\u201d, and to make it a 100% right. For example, we can correct punctuation and capitalization. But also some of the words that YouTube just doesn\u2019t recognize. At the end of that process we have a complete, quality transcript.\r\n\r\n### Closed captioning on original video\u2026 and the beginning of a translation\r\nOnce we have a quality transcript, we can turn it into a high quality closed captioning for people who choose to read the content as they\u2019re watching the video.\r\n\r\n\r\nDuring this step, we can ask YouTube to generate real-time translations into other languages including French, of course. No, we\u2019re not going to pretend that this translation is good enough. Our guess is that the translation is probably 80% to 85 % good, but it\u2019s not ridiculous and it\u2019s kind of fun to check out.\r\n\r\n\r\nAt this point, we have a final English video with closed captioning, a transcript of that video, and a less than perfect French translation, which brought us to test another avenue.\r\n\r\n\r\n### Killing two deliverables with one script\r\nLet\u2019s say\u200a\u2014\u200afor the sake of experimenting how much content we can create in 48 hours\u200a\u2014\u200awe decided to turn the video into a blog post. We handed the English transcript to a human writer, because a script is actually not a very interesting read. It needs the magic touch of a skilled writer.\r\n\r\n\r\nThe same script was run through a translation software, to generate french-language script. For the purposes of our experiment, we\u2019re testing a software called DEEPL, a real-time translation software that allows us to have a very good script that we hand to the narrator of the French video.\r\n\r\n\r\nThis French script are meant as speaking points, not as something you would read textually. It just gives the narrator the background on what we\u2019re trying to accomplish, but they do the video the way they want to do it.\r\n\r\n\r\nOnce the French video is recorded\r\nWe generate the French language transcript (with what was actually said), and edit it the same way we did for the English video, that is through YouTube\u2019s natural language processing and editing tool. And then, we generate quality closed captioning.\r\n\r\n\r\nThe final French transcript is given to a human writer, who will generate the French blog post. You read that right: the blog post is not translated from a full English blog post, but rather a better re-written version of the transcript.\r\n\r\n### Challenge completed!\r\nBeginning to end: 48 hours. Dare we say: \u201cNot bad.\u201d!\r\n\r\n\r\nAt the end of this experiment, we have two videos. We have audio for both. We have two blog posts. We have closed captioning and real-time translation.\r\n\r\n\r\nAs you know, this usually can take weeks, if not longer. So it feels like we\u2019ve actually had a real breakthrough here. And we plan to experiment more with this process in the coming weeks. We\u2019ll tell you all about our experiments, as we test more applications of AI, and as we refine the way that we generate our content in multiple languages.\r\n\r\nNote: This blog post was generated by a human being from the transcript, in less than one hour.",
        "digital_standards": null,
        "edits": null,
        "experience": {
            "Comments": null,
            "Depth": 0,
            "Difficulty": 2,
            "ID": 0,
            "LearningResource": null,
            "LearningResourceID": 0,
            "OccurredAt": "0001-01-01T00:00:00Z",
            "Points": 0,
            "Practices": [{
                "Description": "",
                "ID": 0,
                "Image": null,
                "Name": "Empowering People",
                "Selected": false,
                "Skills": null,
                "Slug": "",
                "Tags": null
            }, {
                "Description": "",
                "ID": 0,
                "Image": null,
                "Name": "Agile",
                "Selected": false,
                "Skills": null,
                "Slug": "",
                "Tags": null
            }, {
                "Description": "",
                "ID": 0,
                "Image": null,
                "Name": "Open Standards & Solutions",
                "Selected": false,
                "Skills": null,
                "Slug": "",
                "Tags": null
            }],
            "Skills": null,
            "Stream": {
                "Description": "The use of digital technologies, as an integrated part of governments\u2019 modernisation strategies, to create public value. Relies on a digital government ecosystem comprised of government actors, non-governmental organisations, businesses, citizens\u2019 associations and individuals which supports the production of and access to data, services and content through interactions with the government.",
                "Expertise": 0,
                "ID": 0,
                "Image": {
                    "AddedOn": "0001-01-01T00:00:00Z",
                    "Description": "",
                    "ID": 0,
                    "Path": "https://s3.amazonaws.com/foundationsapp/static/digital+government.png",
                    "Title": ""
                },
                "LearningTargets": null,
                "Name": "Digital Government",
                "Practices": {},
                "Selected": false,
                "Slug": "digital_government",
                "Tags": null
            },
            "Tags": null,
            "Time": 1,
            "UserName": "",
            "Validated": false,
            "Value": 2,
            "Verb": ""
        },
        "id": 1,
        "image": {
            "AddedOn": "0001-01-01T00:00:00Z",
            "Description": "",
            "ID": 0,
            "Path": "/media/Chris Allison/busrides - _episode 2/DA-AI-OG-TC2.jpg",
            "Title": ""
        },
        "learning_points": null,
        "learning_resources": null,
        "likes": null,
        "podcasts": [{
            "AddedOn": "0001-01-01T00:00:00Z",
            "Description": "An overview of what the Digital Academy is trying to achieve with Busrides",
            "ID": 0,
            "LearningPoints": null,
            "Path": "https://soundcloud.com/tom-camps-172319798/accelerating-content-publishing-using-ai",
            "Title": "Two Lenses on Digital Foundations"
        }],
        "published_on": "Mon, 04 Feb 2019 02:57:10 GMT",
        "query": null,
        "query_class": null,
        "slug": "chris-allison-busrides-episode-2",
        "sub_title": null,
        "tagline": "How to create, translate & publish in 24 hours",
        "tags": ["Digital Leadership", "Academy", "AI Translation"],
        "title": "Busrides - Episode 2",
        "videos": [{
            "AddedOn": "0001-01-01T00:00:00Z",
            "Description": "An overview of what the Digital Academy is trying to achieve with Busrides",
            "ID": 0,
            "LearningPoints": null,
            "Path": "https://youtube.com/embed/AbBcfjLXLTE",
            "Title": "Two Lenses on Digital Foundations"
        }]
    }],
    "api_return": "success"
}]

*/