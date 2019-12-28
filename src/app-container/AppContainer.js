import React from "react";
import FeedOverview from "../feed-overview/FeedOverview";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export default function AppContainer() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route path="/uncle-bob">
          <FeedOverview sourceUrl="https://blog.cleancoder.com/atom.xml" />
        </Route>
      </Switch>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));
