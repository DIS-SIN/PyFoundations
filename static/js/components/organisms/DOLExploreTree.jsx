import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { Typography, CssBaseline, Paper } from '@material-ui/core';
import { connect } from "react-redux";
import { LearningArchitecture } from '../atoms/LearningArchitecture'
import { LearningArchitectureTree } from '../atoms/LearningArchitectureTree'
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import GridExploreTree from '../molecules/GridExploreTree';

/*
let data = {
    name: 'Parent',
    children: [{
        name: 'Child One'
    }, {
        name: 'Child Two'
    }]
};*/

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const theme = createMuiTheme({
    overrides: {
        MuiListItemText: { // Name of the component ⚛️ / style sheet
            primary: { // Name of the rule
                color: 'white', // Some CSS
            },
        },
    },
    typography: { useNextVariants: true },
});

const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    drawerDark: {
        backgroundColor: '#333333',
        color: '#ffffff',
    },
    drawerTextLight: {
        color: '#ffffff',
    },
    paper: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
});

/**
 *                     <span
                        onClick={() => props.onClick(item.trim())}
                    >{item}</span>
 * 
 */
const Breadcrumb = props => (
    <Paper className={props.classes.paper}>

        {props.breadcrumb.split(">").map((item, index) => (
            item ? (
                <React.Fragment key={index} >
                    <Button color="primary" component="span" onClick={() => props.onClick(item.trim())}>
                        {item}
                    </Button>
                    <span>&raquo;</span>
                </React.Fragment>
            ) : ""
        ))}

    </Paper>
);

class DOLExploreTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            top: false,
            left: false,
            bottom: false,
            right: false,
            lat: LearningArchitectureTree(),
            data: { name: "..." },
            breadcrumb: "DOL/AON",
        };
    }

    getBound() {
        const component = document.getElementsByClassName("custom-container")[0];
        if (!component) {
            return {
                width: 600,
                height: 400
            };
        }
        const rect = component.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top + window.scrollY,
            width: rect.width || rect.right - rect.left,
            height: rect.height || rect.bottom - rect.top
        };
    }



    componentDidMount() {
        this.setState({
            isMounted: true,
            data: this.searchTreeBFS(this.state.lat, "DOL/AON"),
            breadcrumb: "DOL/AON",
        })
    };
    componentWillUnmount() {
        this.setState({
            isMounted: false,
        })
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    resetTree = () => {
        this.setState({
            data: this.searchTreeBFS(this.state.lat, "DOL/AON"),
            breadcrumb: "DOL/AON",
        });
    };

    focusTreeBreadcrumb = (nodeKey) => {
        //console.log(nodeKey);
        let treeRenderNode = this.state.lat;
        let breadcrumbArray = this.state.breadcrumb.split(">");
        let breadcrumNew = ""

        for (let i = 0; i < breadcrumbArray.length; i++) {
            //console.log(breadcrumbArray[i].trim());
            if (breadcrumbArray[i].trim().length != 0) {
                if (breadcrumbArray[i].trim() != nodeKey) {

                    breadcrumNew += breadcrumbArray[i].trim() + " > ";
                } else {
                    breadcrumNew += nodeKey;
                    this.setState({
                        data: this.searchTreeBFS(treeRenderNode, nodeKey),
                        breadcrumb: breadcrumNew,
                        //treeRenderNode[0].children[nodeKey].children,
                    });
                }
            }

        }
    };

    focusTree = (e) => {
        //console.log(e);
        let nodeKey = e.target.parentNode.getElementsByTagName("text")[0].innerHTML;
        let treeRenderNode = this.state.lat;
        let breadcrumbArray = this.state.breadcrumb.split(">");

        if (breadcrumbArray[breadcrumbArray.length - 1].trim() != nodeKey) {
            this.setState({
                data: this.searchTreeBFS(treeRenderNode, nodeKey),
                breadcrumb: this.state.breadcrumb + " > " + nodeKey,
            });
        }
    };

    searchTreeBFS = (element, matchingTitle) => {
        let treeSearchNode = this.searchTree(element, matchingTitle);
        let treeRenderNode = { "name": treeSearchNode.name, children: [] }

        if (treeSearchNode.children != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < treeSearchNode.children.length; i++) {
                treeRenderNode.children.push({ "name": treeSearchNode.children[i].name });
            }
            //return treeRenderNode;
        }
        return treeRenderNode;
    };

    searchTree = (element, matchingTitle) => {
        if (element.name == matchingTitle) {
            return element;
        } else if (element.children != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < element.children.length; i++) {
                result = this.searchTree(element.children[i], matchingTitle);
            }
            return result;
        }
        return null;
    };

    //chartWidth = ReactDOM.findDOMNode(this.content).offsetWidth;

    render() {
        const la = LearningArchitecture();
        //const data = LearningArchitectureTree();
        const { classes, literals } = this.props;
        const { data, breadcrumb } = this.state;
        //console.log(breadcrumb);

        const practices = la.loach_structure.architecture.slice(0);
        const streams = la.loach_structure.streams.slice(0);

        const learningArchStreamItems = streams.map((learningarch, index) => (
            <ListItem button component={Link} to="/view/stream" key={index} >
                <Typography component={ListItem} secondary={literals.common.streams} variant="button" color="inherit" className={classes.drawerTextLight}>
                    {learningarch.stream}
                </Typography>
            </ListItem >
        ));
        const learningArchPracticeItems = practices.map((learningarch, index) => (
            <ListItem button component={Link} to="/view/practice" key={index} >
                <Typography component={ListItem} secondary={literals.common.practice} variant="button" color="inherit" className={classes.drawerTextLight}>
                    {learningarch.practice}
                </Typography>
            </ListItem >
        ));

        const learnList = (
            <div className={classes.fullList}>
                <List className={classes.drawerDark}>{/** learningarchitecture.loach_structure.streams[].stream */}
                    <Typography component={ListItem} variant="h6" color="inherit" className={classes.drawerTextLight}>
                        {literals.common.streams}
                    </Typography>
                    {learningArchStreamItems}
                    <Divider />
                    <Typography component={ListItem} variant="h6" color="inherit" className={classes.drawerTextLight}>
                        {literals.common.practices}
                    </Typography>
                    {learningArchPracticeItems}
                </List>
            </div>
        );

        return (
            <React.Fragment>
                <div className="treeChartContainer">
                    {/*learnList*/}
                    <CssBaseline />

                    <GridExploreTree
                        key="exploretree"
                        title={
                            <React.Fragment>
                                {literals.pages.home.hero.title}
                                <Button onClick={this.resetTree} color="primary">Reset</Button>
                                <Breadcrumb breadcrumb={breadcrumb} onClick={this.focusTreeBreadcrumb} classes={classes} />
                            </React.Fragment>
                        }
                        cover="http://placeimg.com/640/360/tech"
                        text={
                            <React.Fragment>
                                <Tree
                                    data={data}
                                    height={400}
                                    width={this.getBound().width * 0.7}
                                    svgProps={{
                                        //transform: 'rotate(90)',
                                        onClick: this.focusTree,
                                        className: 'custom'
                                    }}
                                    animated={this.state.isMounted ? true : false}
                                />
                            </React.Fragment>
                        }
                        xs={12}
                        sm={12}
                        md={12}
                    />
                </div>
            </React.Fragment>
        );
    }
}

DOLExploreTree.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLExploreTree));