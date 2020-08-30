import { UserAction } from "../actions/user";
import { LOGIN_TYPE, LOGOUT_TYPE } from "../constants";
import { IUserState } from "../types";

export const initialUserState: IUserState = {
  loggedIn: false,
  data: {}
};

export const userReducer = (
  state: IUserState = initialUserState,
  action: UserAction
): IUserState => {
  switch (action.type) {
    case LOGIN_TYPE:
      if (state.loggedIn) {
        return state;
      } else {
        return {
          loggedIn: true,
          data: action.data
        };
      }
    case LOGOUT_TYPE:
      return {
        loggedIn: false,
        data: {}
      };
    default:
      return state;
  }
};
