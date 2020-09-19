import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { Layout } from "../../components/Layout";

let wrapper: RenderResult;
let title: string;

beforeEach(() => {
  title = "Some Title";
  wrapper = render(
    <Layout pageTitle={title}>
      <p>content here</p>
    </Layout>
  );
});

test("should render Layout correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
