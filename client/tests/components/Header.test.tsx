import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import { Header } from "../../components/Header";

let wrapper: ShallowWrapper;
let title: string;

beforeEach(() => {
  title = "Some Title";
  wrapper = shallow(<Header title={title} />);
});

test("should render Header correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
