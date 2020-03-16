import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import NavigationItem from "./NavigationItem";
import OpinionatersDomain from "../opinionaters/OpinionatersDomain";

export default function NavigationDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const opinionatersDomain = new OpinionatersDomain();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationDrawer = () => {
    return (
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp>{mobileDrawer()}</Hidden>
        <Hidden xsDown>{desktopDrawer()}</Hidden>
      </nav>
    );
  };

  const mobileDrawer = () => {
    return (
      <Drawer
        container={container}
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawerItems()}
      </Drawer>
    );
  };

  const desktopDrawer = () => {
    return (
      <Drawer
        classes={{
          paper: classes.drawerPaper
        }}
        variant="permanent"
        open
      >
        {drawerItems()}
      </Drawer>
    );
  };

  const drawerItems = () => {
    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {items().map(item => (
            <NavigationItem
              id={`link-${item.key}`}
              key={item.key}
              to={item.route}
              primary={item.label}
            />
          ))}
        </List>
      </div>
    );
  };

  const items = () => {
    return opinionatersDomain.getPeopleList();
  };

  return navigationDrawer();
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
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
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));
