import { SET_POST, ADD_POST, UPDATE_POST, DELETE_POST } from "../constants";
import { IPostData, IInitAction } from "../types";

interface ISetPostsAction {
  type: typeof SET_POST;
  posts: IPostData[];
}

interface IAddPostAction {
  type: typeof ADD_POST;
  post: IPostData;
}

interface IDeletePostAction {
  type: typeof DELETE_POST;
  postId: string;
}

interface IUpdatePostAction {
  type: typeof UPDATE_POST;
  updatedPost: IPostData;
}
export const setPosts = (data: IPostData[]): ISetPostsAction => ({
  type: "SET_POST",
  posts: data
});

export const addPost = (newPost: IPostData): IAddPostAction => ({
  type: "ADD_POST",
  post: newPost
});

export const deletePost = (postId: string): IDeletePostAction => ({
  type: "DELETE_POST",
  postId
});

export const updatePost = (updatedPost: IPostData): IUpdatePostAction => ({
  type: "UPDATE_POST",
  updatedPost
});

export type PostAction =
  | ISetPostsAction
  | IAddPostAction
  | IDeletePostAction
  | IUpdatePostAction
  | IInitAction;
