import React, { useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import PeopleService from "../people/PeopleService";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const useTabItemStyles = makeStyles(() => ({
  root: {
    minHeight: 64
  }
}));

export default function Content(props) {
  const styles = useStyles();
  const classes = props.classes ? props.classes : styles;
  const tabItemStyles = useTabItemStyles();

  const [activeTab, setActiveTab] = React.useState(0);
  const handleChangeTab = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const twitterTimeline = "twitter-timeline";
  const { id } = useParams();
  const ref = useRef(null);
  const peopleService = PeopleService();
  const people = peopleService.getPeople(id);
  React.useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    people.renderTweets(twitterTimeline, width);
  });

  const tab = (label, dataTab, index, isDisabled) => {
    return (
      <Tab
        disabled={isDisabled}
        classes={tabItemStyles}
        label={label}
        data-tab={dataTab}
        {...a11yProps(index)}
      />
    );
  };

  const tabPanel = (index, dataContent, children) => {
    return (
      <TabPanel value={activeTab} index={index} data-content={dataContent}>
        {children}
      </TabPanel>
    );
  };

  return (
    <div className={classes.content} ref={ref}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            className={classes.toolBar}
          >
            {tab(
              "Twitter Timeline",
              "twitter",
              0,
              people.twitterHandle === null
            )}
            {tab("RSS Feed", "rss", 1, people.rssFeedUrl === null)}
            {tab("Short Bio", "bio", 1, false)}
          </Tabs>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolBar} />
        {tabPanel(0, "twitter", <span className={twitterTimeline} />)}
        {tabPanel(1, "rss", `Item Two ${id}`)}
        {tabPanel(2, "bio", `Item Three ${id}`)}
      </main>
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.any
};

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box pt={8}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
