import React from "react";
import { shallow } from "enzyme";
import NavigationDrawer from "./NavigationDrawer";
import NavigationItem from "./NavigationItem";

jest.mock("../people/PeopleService", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPeopleList: () => [
        {
          id: "test_1",
          fullName: "Test 1",
          twitterHandle: "test1",
          rssFeedUrl: "test1.com"
        },
        {
          id: "test_2",
          fullName: "Test 2",
          twitterHandle: "test2",
          rssFeedUrl: "test2.com"
        },
        {
          id: "test_3",
          fullName: "Test 3",
          twitterHandle: "test3",
          rssFeedUrl: "test3.com"
        }
      ]
    };
  });
});

let container;

beforeEach(() => {
  container = shallow(<NavigationDrawer />);
});

afterEach(() => {
  container = null;
});

test("Navigation Drawer should contain links directing to content", () => {
  const navigationItemsRendered = container.find(NavigationItem);
  // NavigationItems will be printed twice because they will populate both mobile and web drawer.
  expect(navigationItemsRendered.length).toEqual(6);
});
