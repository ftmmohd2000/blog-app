import { loginAction, logoutAction } from "../../../redux/actions/user";
import { INIT_TYPE } from "../../../redux/constants";
import { initialUserState, userReducer } from "../../../redux/reducers/user";
import { IInitAction } from "../../../redux/types";
import { createFakeUser } from "../../fixtures/user";

test("should instantiate state", () => {
  const action: IInitAction = { type: INIT_TYPE };
  const newState = userReducer(undefined, action);
  expect(newState).toEqual(initialUserState);
});

test("should login user", () => {
  const data = createFakeUser();
  const action = loginAction(data);
  const oldState1 = initialUserState;
  const oldState2 = {
    loggedIn: false,
    data: {}
  };

  const loggedInState = {
    loggedIn: true,
    data
  };

  const newState1 = userReducer(oldState1, action);
  expect(newState1).toEqual(loggedInState);

  const newState2 = userReducer(oldState2, action);
  expect(newState2).toEqual(loggedInState);
});

test("should logout user", () => {
  const data = createFakeUser();
  const action = logoutAction();

  const oldState1 = initialUserState;
  const oldState2 = {
    loggedIn: true,
    data
  };

  const newState1 = userReducer(oldState1, action);
  const newState2 = userReducer(oldState2, action);

  const loggedOutState = {
    loggedIn: false,
    data: {}
  };

  expect(newState1).toEqual(loggedOutState);
  expect(newState2).toEqual(loggedOutState);
});

test("should keep logged out user logged out", () => {
  const action = logoutAction();
  const oldState = {
    loggedIn: false,
    data: {}
  };
  const newState = userReducer(oldState, action);
  expect(newState).toEqual({
    loggedIn: false,
    data: {}
  });
});

test("should not log in another user when someone is already logged in", () => {
  const data1 = createFakeUser();
  const data2 = createFakeUser();
  const action = loginAction(data2);
  const oldState = {
    loggedIn: true,
    data: data1
  };
  const newState = userReducer(oldState, action);
  expect(newState).toEqual({
    loggedIn: true,
    data: data1
  });
});

test("logging in a user again should not cause any problems", () => {
  const data = createFakeUser();
  const action = loginAction(data);

  const oldState = {
    loggedIn: true,
    data
  };

  const newState = userReducer(oldState, action);

  expect(newState).toEqual(oldState);
});
