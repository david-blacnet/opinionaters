import React from "react";
import Content from "./Content";
import { shallow } from "enzyme";

const mockRenderTweets = jest.fn();
const mockPeople = id => ({
  id,
  renderTweets: mockRenderTweets
});

jest.mock("../people/PeopleService", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPeople: id => mockPeople(id)
    };
  });
});

jest.mock("react-router-dom", () => ({
  // use actual for all non-hook parts
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "test"
  }),
  useRouteMatch: () => ({ url: "/test" })
}));

test("It should call the People domain to get the latest twitter updates ", () => {
  jest.spyOn(React, "useEffect").mockImplementation(f => f());
  shallow(<Content />);
  expect(mockRenderTweets).toHaveBeenCalled();
});
