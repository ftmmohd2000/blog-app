import { IPostState } from "../types";
import { PostAction } from "../actions/post";
import { ADD_POST, SET_POST, DELETE_POST, UPDATE_POST } from "../constants";

export const initialPostState: IPostState = [];

export const postReducer = (
  state: IPostState = initialPostState,
  action: PostAction
): IPostState => {
  switch (action.type) {
    case SET_POST:
      return action.posts;
    case ADD_POST:
      return [...state, action.post];
    case DELETE_POST:
      return state.filter((post) => post.id !== action.postId);
    case UPDATE_POST:
      const newState = state.filter(
        (post) => post.id !== action.updatedPost.id
      );
      return newState.concat(action.updatedPost);
    default:
      return state;
  }
};
