import React from "react";
import PropTypes from "prop-types";
import FeedOverview from "../feed-overview/FeedOverview";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function TabPanel(props) {
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
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function AppContainer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route path="/uncle-bob">
          <AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="RSS Feed" {...a11yProps(0)} />
              <Tab label="Twitter Timeline" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <FeedOverview sourceUrl="https://blog.cleancoder.com/atom.xml" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="unclebobmartin"
              />
            </TabPanel>
          </AppBar>
        </Route>
        <Route path="/baeldung">
          <AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="RSS Feed" {...a11yProps(0)} />
              <Tab label="Twitter Timeline" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <FeedOverview sourceUrl="https://www.baeldung.com/feed/" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="baeldung"
              />
            </TabPanel>
          </AppBar>
        </Route>
      </Switch>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper
  }
}));
