import React from "react";
import NavigationDrawer from "./navigation/NavigationDrawer";
import { Route, Switch } from "react-router-dom";
import Content from "./Content";

export default function App(props) {
  return (
    <div id="opinionaters">
      <NavigationDrawer />
      <Switch>
        <Route path="/:key">
          <Content />
        </Route>
      </Switch>
    </div>
  );
}
