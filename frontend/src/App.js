import React from "react";
import NavigationDrawer from "./navigation/NavigationDrawer";
import { Route, Switch } from "react-router-dom";
import Content from "./content/Content";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <div id="opinionaters" className={classes.root}>
      <CssBaseline />
      <NavigationDrawer />
      <Switch>
        <Route path="/:key">
          <Content />
        </Route>
      </Switch>
    </div>
  );
}
