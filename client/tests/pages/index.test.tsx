import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import Home from "../../pages";

let wrapper: ShallowWrapper;

beforeEach(() => {
  wrapper = shallow(<Home />);
});

test("should render Home page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
