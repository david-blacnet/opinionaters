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
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const hookClasses = useStyles();
  const tabItemStyles = useTabItemStyles();
  const { id } = useParams();
  const ref = useRef(null);
  const classes = props.classes ? props.classes : hookClasses;

  const twitterTimelineHolder = "twitter-timeline";

  const peopleService = PeopleService();
  const people = peopleService.getPeople(id);

  React.useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    people.renderTweets(twitterTimelineHolder, width);
  });

  const handleChangeTab = (event, newActiveTabIndex) => {
    setActiveTabIndex(newActiveTabIndex);
  };

  return (
    <div className={classes.content} ref={ref}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Tabs
            value={activeTabIndex}
            onChange={handleChangeTab}
            className={classes.toolBar}
          >
            {people.twitterHandle !== null && (
              <Tab
                classes={tabItemStyles}
                label="Twitter Timeline"
                data-tab="twitter"
                {...a11yProps(0)}
              />
            )}
            {people.rssFeedUrl !== null && (
              <Tab
                classes={tabItemStyles}
                label="RSS Feed"
                data-tab="rss"
                {...a11yProps(1)}
              />
            )}
            <Tab
              classes={tabItemStyles}
              label="Short Bio"
              data-tab="bio"
              {...a11yProps(2)}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolBar} />
        {people.twitterHandle !== null && (
          <TabPanel value={activeTabIndex} index={0} data-content="twitter">
            <span className={twitterTimelineHolder} />
          </TabPanel>
        )}
        {people.rssFeedUrl !== null && (
          <TabPanel value={activeTabIndex} index={1} data-content="rss">
            Item Two {id}
          </TabPanel>
        )}
        <TabPanel value={activeTabIndex} index={2} data-content="bio">
          Item Three {id}
        </TabPanel>
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
