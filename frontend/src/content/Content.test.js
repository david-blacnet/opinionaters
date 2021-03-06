import React from "react";
import Content, { TabPanel } from "./Content";
import { shallow } from "enzyme";
import { Tab } from "@material-ui/core";

jest.mock("react-router-dom", () => ({
  // use actual for all non-hook parts
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "test"
  }),
  useRouteMatch: () => ({ url: "/test" })
}));

const mockGetPeople = jest.fn();
const mockRenderTweets = jest.fn();
let mockPeople;
jest.mock("../people/PeopleService", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPeople: mockGetPeople
    };
  });
});

const twitterTab = '[data-tab="twitter"]';
const rssTab = '[data-tab="rss"]';

test("Content should call the People domain to get the latest twitter updates ", () => {
  mockPeople = id => ({
    id,
    twitterHandle: "@test",
    renderTweets: mockRenderTweets
  });
  mockGetPeople.mockImplementationOnce(mockPeople);
  jest.spyOn(React, "useEffect").mockImplementation(f => f());

  shallow(<Content />);

  expect(mockRenderTweets).toHaveBeenCalled();
});

test("Content should only render RSS Feed and Short Bio if the people does not have twitter handle", () => {
  mockPeople = id => ({
    id,
    twitterHandle: null,
    rssFeedUrl: "https://www.test.com/feed",
    renderTweets: mockRenderTweets
  });

  testContent(twitterTab, rssTab);
});

test("Content should only render Twitter Timeline and Short Bio if the people does not have rss feed url", () => {
  mockPeople = id => ({
    id,
    twitterHandle: "@test",
    rssFeedUrl: null,
    renderTweets: mockRenderTweets
  });
  testContent(rssTab, twitterTab);
});

function testContent(tabA, tabB) {
  mockGetPeople.mockImplementationOnce(mockPeople);
  const container = shallow(<Content />);
  expect(container.find(Tab).length).toEqual(3);
  expect(container.find(TabPanel).length).toEqual(3);
  expect(container.find(tabA).props().disabled).toBeTruthy();
  expect(container.find(tabB).props().disabled).toBeFalsy();
}
