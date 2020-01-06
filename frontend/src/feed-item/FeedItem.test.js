import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import React from "react";
import FeedItem from "./FeedItem";

describe("FeedItem", () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("should render using given props", async () => {
    const item = {
      title: "Title",
      content: "<p>test</p>",
      link: "https://test.com/"
    };
    await act(async () => {
      render(<FeedItem item={item} />, container);
    });
    expect(container.querySelector("h6").textContent).toEqual("Title");
    expect(container.querySelector("span").innerHTML).toEqual("<p>test</p>");
  });
});
