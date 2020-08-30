import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { Header } from "../../../components/shared/Header";

let wrapper: RenderResult;
let title: string;

beforeEach(() => {
  title = "Some Title";
  wrapper = render(<Header title={title} />);
});

test("should render Header correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
