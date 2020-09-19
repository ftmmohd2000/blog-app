import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import LoginForm from "../../components/LoginForm";
import { delay } from "../test-utils/delay";
import { withTestRouter } from "../test-utils/withTestRouter";
import {
  emailInputElement,
  errorMessageElement,
  loadingSignElement,
  passwordInputElement,
  submitButtonElement
} from "./constants";
import { loginEmail, loginPassword, mocks } from "./fixtures/loginQueries";

let wrapper: RenderResult;

beforeEach(() => {
  wrapper = render(
    withTestRouter(
      <MockedProvider mocks={mocks}>
        <LoginForm />
      </MockedProvider>
    )
  );
});

test("should render LoginForm correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should request login from api", async (done) => {
  const { findByTestId, queryByTestId } = wrapper;
  fireEvent.change(await findByTestId(emailInputElement), {
    target: { value: loginEmail }
  });
  fireEvent.change(await findByTestId(passwordInputElement), {
    target: { value: loginPassword }
  });
  await act(async () => {
    fireEvent.click(await findByTestId(submitButtonElement));
  });
  await delay(50);
  expect(queryByTestId(loadingSignElement)).toBeFalsy();
  expect(queryByTestId(errorMessageElement)).toBeFalsy();
  done();
});
