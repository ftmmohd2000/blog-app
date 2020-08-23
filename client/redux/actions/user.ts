import { LOGIN_TYPE, LOGOUT_TYPE } from "../constants";
import { IUserData, IInitAction } from "../types";

interface ILoginAction {
  type: typeof LOGIN_TYPE;
  data: IUserData;
}

interface ILogoutAction {
  type: typeof LOGOUT_TYPE;
}

export const loginAction = (data: IUserData): ILoginAction => ({
  type: LOGIN_TYPE,
  data
});

export const logoutAction = (): ILogoutAction => ({
  type: LOGOUT_TYPE
});

export type UserAction = ILoginAction | ILogoutAction | IInitAction;
