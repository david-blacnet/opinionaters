import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import NavigationItem from "./NavigationItem";
import PeopleService from "../people/PeopleService";

export default function NavigationDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const peopleService = PeopleService();

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
        {drawerItems}
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
        {drawerItems}
      </Drawer>
    );
  };

  const items = peopleService.getPeopleList().map(people => ({
    key: people.id,
    navigationItem: {
      id: people.id,
      to: `/${people.id}`,
      label: people.fullName
    }
  }));

  const refs = [];

  const drawerItems = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {items.map(item => {
          const ref = React.createRef();
          refs.push(ref);

          return (
            <NavigationItem
              key={item.key}
              ref={ref}
              item={item.navigationItem}
            />
          );
        })}
      </List>
    </div>
  );

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
