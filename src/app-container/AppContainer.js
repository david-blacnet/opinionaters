import React from "react";
import FeedOverview from "../feed-overview/FeedOverview";
import { Route, Switch } from "react-router-dom";

export default function AppContainer() {
  return (
    <Switch>
      <Route path="/uncle-bob">
        <FeedOverview sourceUrl="https://blog.cleancoder.com/atom.xml" />
      </Route>
    </Switch>
  );
}
