import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import NavigationItem from "./NavigationItem";
import PeopleService from "../people/PeopleService";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  }
}));

export default function NavigationDrawer(props) {
  const hookClasses = useStyles();
  const { classes } = props.classes ? props : { classes: hookClasses };

  const peopleService = PeopleService();

  const items = peopleService.getPeopleList().map(people => ({
    key: people.id,
    navigationItem: {
      id: people.id,
      to: `/${people.id}`,
      label: people.fullName
    }
  }));
  const refs = [];

  const navigationDrawer = () => {
    return (
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        variant="permanent"
        anchor="left"
      >
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
      </Drawer>
    );
  };

  return navigationDrawer();
}
