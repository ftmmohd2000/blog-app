import { MockedResponse } from "@apollo/client/testing";
import { SIGNUP_MUTATION } from "../../../../gql/mutations";
import { success } from "../../../../redux/constants";

export const signupEmail = "someEmail@someDomain.com";
export const signupPassword = "somePasswd";
export const signupFirstName = "someFirstName";
export const signupLastName = "someLastName";

export const mocks: MockedResponse[] = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: signupEmail,
        password: signupPassword,
        firstName: signupFirstName,
        lastName: signupLastName
      }
    },
    result: {
      data: {
        signup: success
      }
    }
  }
];
