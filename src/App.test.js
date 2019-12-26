import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import FeedOverview from "./feed-overview/FeedOverview";

test("renders FeedOverview", () => {
  const wrapper = shallow(<App />);

  expect(wrapper.find(FeedOverview)).toHaveLength(1);
});
