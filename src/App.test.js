import React from "react";
import App from "./App";
import { act } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    render(<App />, container);
  });
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders App with 'Opinionaters' on its app bar", () => {
  expect(container.querySelector("#app-bar").textContent).toEqual(
    "Opinionaters"
  );
});

it("renders App with several links attached", () => {
  expect(
    container.querySelectorAll("li[id^='link']").length
  ).toBeGreaterThanOrEqual(1);
});
