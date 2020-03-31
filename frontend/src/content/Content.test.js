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
jest.mock("../people/PeopleService", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPeople: mockGetPeople
    };
  });
});

test("Content should call the People domain to get the latest twitter updates ", () => {
  const mockPeople = id => ({
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
  const mockPeople = id => ({
    id,
    twitterHandle: null,
    rssFeedUrl: "https://www.test.com/feed",
    renderTweets: mockRenderTweets
  });

  mockGetPeople.mockImplementationOnce(mockPeople);
  const container = shallow(<Content />);
  expect(container.find(Tab).length).toEqual(2);
  expect(container.find(TabPanel).length).toEqual(2);
  expect(container.exists('[data-tab="twitter"]')).toBeFalsy();
  expect(container.exists('[data-content="twitter"]')).toBeFalsy();
  expect(container.exists('[data-tab="rss"]')).toBeTruthy();
  expect(container.exists('[data-content="rss"]')).toBeTruthy();
});

test("Content should only render Twitter Timeline and Short Bio if the people does not have rss feed url", () => {
  const mockPeople = id => ({
    id,
    twitterHandle: "@test",
    rssFeedUrl: null,
    renderTweets: mockRenderTweets
  });

  mockGetPeople.mockImplementationOnce(mockPeople);
  const container = shallow(<Content />);
  expect(container.find(Tab).length).toEqual(2);
  expect(container.find(TabPanel).length).toEqual(2);
  expect(container.exists('[data-tab="rss"]')).toBeFalsy();
  expect(container.exists('[data-content="rss"]')).toBeFalsy();
  expect(container.exists('[data-tab="twitter"]')).toBeTruthy();
  expect(container.exists('[data-content="twitter"]')).toBeTruthy();
});
