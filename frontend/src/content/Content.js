import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router";
import Toolbar from "@material-ui/core/Toolbar";

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
  const hookClasses = useStyles();
  const tabItemStyles = useTabItemStyles();
  const { key } = useParams();
  const classes = props.classes ? props.classes : hookClasses;
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const handleChangeTab = (event, newActiveTabIndex) => {
    setActiveTabIndex(newActiveTabIndex);
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Tabs
            value={activeTabIndex}
            onChange={handleChangeTab}
            className={classes.toolBar}
          >
            <Tab classes={tabItemStyles} label="Item One" {...a11yProps(0)} />
            <Tab classes={tabItemStyles} label="Item Two" {...a11yProps(1)} />
            <Tab classes={tabItemStyles} label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolBar} />
        <TabPanel value={activeTabIndex} index={0}>
          Item One {key}
        </TabPanel>
        <TabPanel value={activeTabIndex} index={1}>
          Item Two {key}
        </TabPanel>
        <TabPanel value={activeTabIndex} index={2}>
          Item Three {key}
        </TabPanel>
      </main>
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.any
};

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
      <Box pt={8}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
