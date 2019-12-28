import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./app-container/AppContainer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import ListItemLink from "./list-item-link/ListItemLink";

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

export default function App(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const links = [
    {
      key: "uncle_bob",
      label: "Robert C. Martin",
      route: "/uncle-bob"
    }
  ];

  const routerContainer = () => {
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          {appBar()}
          {navigationDrawer()}
          <AppContainer />
        </div>
      </BrowserRouter>
    );
  };

  const appBar = () => {
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

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
          {links.map(item => (
            <ListItemLink key={item.key} to={item.route} primary={item.label} />
          ))}
        </List>
      </div>
    );
  };

  return routerContainer();
}
