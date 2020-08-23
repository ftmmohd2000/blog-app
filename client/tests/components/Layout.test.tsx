import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import { Layout } from "../../components/Layout";

let wrapper: ShallowWrapper;
let title: string;

beforeEach(() => {
  title = "Some Title";
  wrapper = shallow(
    <Layout pageTitle={title}>
      <p>content here</p>
    </Layout>
  );
});

test("should render Layout correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
