import { createFakePosts, createFakePost } from "../../fixtures/post";
import {
  setPosts,
  addPost,
  deletePost,
  updatePost
} from "../../../redux/actions/post";
import {
  SET_POST,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST
} from "../../../redux/constants";
import faker from "faker";

test("should return setPosts action", () => {
  const posts = createFakePosts(5);
  const action = setPosts(posts);
  expect(action).toEqual({
    type: SET_POST,
    posts
  });
});

test("should return addPost action", () => {
  const post = createFakePost();
  const action = addPost(post);
  expect(action).toEqual({
    type: ADD_POST,
    post
  });
});

test("should return deletePost action", () => {
  const postId = faker.random.alphaNumeric(32);
  const action = deletePost(postId);
  expect(action).toEqual({
    type: DELETE_POST,
    postId
  });
});

test("should return updatePost action", () => {
  const updatedPost = createFakePost();
  const action = updatePost(updatedPost);
  expect(action).toEqual({
    type: UPDATE_POST,
    updatedPost
  });
});
