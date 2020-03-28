import React from "react";
import NavigationItem from "./NavigationItem";
import { mount } from "enzyme";
import { BrowserRouter, Link } from "react-router-dom";

test("Navigation Item should contain these elements", () => {
  const item = {
    id: "id",
    to: "/test",
    label: "label"
  };
  const ref = React.createRef();
  const container = mount(
    <BrowserRouter>
      <NavigationItem item={item} ref={ref} />
    </BrowserRouter>
  );
  const navigationItem = container.find(NavigationItem);
  const link = navigationItem.find(Link);
  const linkProps = link.props();

  expect(navigationItem.contains(Link)).toBeTruthy();
  expect(navigationItem.find("li").props().id).toContain("id");
  expect(linkProps.to).toEqual("/test");
  expect(link.html()).toContain("label");
});
