import { MockedResponse } from "@apollo/client/testing";
import { LOGIN_MUTATION } from "../../../../apollo/mutations";
import { success } from "../../../../components/login/LoginForm";

export const loginEmail = "someEmail@someDomain.com";
export const loginPassword = "somePasswd";
export const mocks: MockedResponse[] = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        email: loginEmail,
        password: loginPassword
      }
    },
    result: {
      data: {
        login: success
      }
    }
  }
];
