import React from "react";
import { Switch } from "react-router-dom";
import App from "./App";
import NavigationDrawer from "./navigation/NavigationDrawer";
import Content from "./content/Content";
import { shallow } from "enzyme";

let container = null;
beforeEach(() => {
  container = shallow(<App />);
});

afterEach(() => {
  container = null;
});

test("App should contain the needed components", () => {
  const containerChildren = container.find("div#opinionaters").children();
  expect(containerChildren.contains(<NavigationDrawer />)).toBeTruthy();

  const switchChildren = container.find(Switch).children();
  expect(switchChildren.contains(<Content />)).toBeTruthy();
});
