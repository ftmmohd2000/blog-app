import { INIT_TYPE } from "./constants";

export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IPostData {
  id: string;
  title: string;
  content: string;
}

export type IUserState = {
  loggedIn: boolean;
  data: IUserData | {};
};

export type IPostState = IPostData[];

export type RootState = {
  user: IUserState;
};

export interface IInitAction {
  type: typeof INIT_TYPE;
}
