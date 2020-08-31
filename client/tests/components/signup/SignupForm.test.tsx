import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import SignupForm from "../../../components/signup/SignupForm";
import { withTestRouter } from "../../utils/withTestRouter";
import {
  emailInputElement,
  firstNameInputElement,
  lastNameInputElement,
  passwordInputElement,
  submitButtonElement,
  loadingSignElement,
  errorMessageElement
} from "../shared/constants";
import {
  mocks,
  signupFirstName,
  signupLastName,
  signupEmail,
  signupPassword
} from "./fixtures/signupQueries";
import { act } from "react-dom/test-utils";
import { delay } from "../../utils/delay";

let wrapper: RenderResult;

beforeEach(() => {
  wrapper = render(
    withTestRouter(
      <MockedProvider mocks={mocks}>
        <SignupForm />
      </MockedProvider>
    )
  );
});

test("should render LoginForm correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should request signup from api", async (done) => {
  const { queryByTestId, findByTestId } = wrapper;
  fireEvent.change(await findByTestId(firstNameInputElement), {
    target: { value: signupFirstName }
  });
  fireEvent.change(await findByTestId(lastNameInputElement), {
    target: { value: signupLastName }
  });
  fireEvent.change(await findByTestId(emailInputElement), {
    target: { value: signupEmail }
  });
  fireEvent.change(await findByTestId(passwordInputElement), {
    target: { value: signupPassword }
  });
  await act(async () => {
    fireEvent.click(await findByTestId(submitButtonElement));
  });
  await delay(50);
  expect(queryByTestId(loadingSignElement)).toBeFalsy();
  expect(queryByTestId(errorMessageElement)).toBeFalsy();
  done();
});
