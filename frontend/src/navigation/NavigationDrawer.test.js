import React from "react";
import { shallow } from "enzyme";
import NavigationDrawer from "./NavigationDrawer";
import NavigationItem from "./NavigationItem";

jest.mock("./");

let container = null;

beforeEach(() => {
  container = shallow(<NavigationDrawer />);
});

afterEach(() => {
  container = null;
  jest.resetAllMocks();
});

test("Navigation Drawer should contain links directing to content", () => {
  const navigationItemsRendered = container.find(NavigationItem);
  expect(navigationItemsRendered.length).toEqual(3);
});
