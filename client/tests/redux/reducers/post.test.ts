import { postReducer, initialPostState } from "../../../redux/reducers/post";
import { INIT_TYPE } from "../../../redux/constants";
import { createFakePosts, createFakePost } from "../../fixtures/post";
import {
  setPosts,
  addPost,
  deletePost,
  updatePost
} from "../../../redux/actions/post";

test("should instantiate state", () => {
  const oldState = undefined;
  const newState = postReducer(oldState, { type: INIT_TYPE });
  expect(newState).toEqual(initialPostState);
});

test("should set posts", () => {
  const posts = createFakePosts(5);
  const oldState = initialPostState;
  const newState = postReducer(oldState, setPosts(posts));
  expect(newState).toEqual(posts);
});

test("should add new post", () => {
  const post = createFakePost();
  const oldState = createFakePosts(2);
  const newState = postReducer(oldState, addPost(post));
  expect(newState).toEqual([...oldState, post]);
});

test("should delete post", () => {
  const delIndex = 3;
  const oldState = createFakePosts(5);
  const newState = postReducer(oldState, deletePost(oldState[delIndex].id));
  expect(newState).toEqual([
    ...oldState.slice(0, delIndex),
    ...oldState.slice(delIndex + 1)
  ]);
});

test("should update post", () => {
  const updIndex = 3;
  const oldState = createFakePosts(5);

  const updatedPost = { ...createFakePost(), id: oldState[updIndex].id };
  const newState = postReducer(oldState, updatePost(updatedPost));
  expect(newState).toEqual([
    ...oldState.slice(0, updIndex),
    ...oldState.slice(updIndex + 1),
    updatedPost
  ]);
});
