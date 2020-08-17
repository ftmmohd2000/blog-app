import { Connection } from "typeorm";
import { TestClient } from "../../../test-utils/TestClient";
import { createTypeormConn } from "../../../utils/createTypeormConn";
import { createFakePost } from "../../fixtures/post";
import { createFakeUser } from "../../fixtures/user";
import { success, unauthorizedMessage } from "../../../constants";
import {
  titleProfanityError,
  contentProfanityError
} from "../../../modules/post/postActions/errorMessages";

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeormConn();
});

afterAll(async () => {
  conn.close();
});

test("should create post", async () => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();

  await client.register(fakeUser);
  await client.login(fakeUser.email, fakeUser.password);

  const fakePost = createFakePost();

  const response = await client.createPost(fakePost);

  expect(response.data).toEqual({
    createPost: success
  });
});

test("should not create post with profanity in title", async () => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();

  await client.register(fakeUser);
  await client.login(fakeUser.email, fakeUser.password);

  const fakePost = createFakePost();

  const response1 = await client.createPost({
    title: fakePost.title + " fuck",
    content: fakePost.content
  });
  const response2 = await client.me();

  expect(response1.data).toEqual({
    createPost: null
  });

  expect(response1.errors).toHaveLength(1);

  expect(response1.errors[0].message).toBe(titleProfanityError);

  expect(response2.data.me.posts).toHaveLength(0);
});

test("should not create post with profanity in content", async () => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();

  await client.register(fakeUser);
  await client.login(fakeUser.email, fakeUser.password);

  const fakePost = createFakePost();

  const response = await client.createPost({
    title: fakePost.title,
    content: fakePost.content + " fuck"
  });

  expect(response.data).toEqual({
    createPost: null
  });

  expect(response.errors).toHaveLength(1);

  expect(response.errors[0].message).toBe(contentProfanityError);
});

test("should not create post for unlogged user", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();

  await client.register(fakeUser);

  const fakePost = createFakePost();

  let response = await client.createPost(fakePost);

  expect(response.data.createPost).toBeNull();

  expect(response.errors).toHaveLength(1);

  expect(response.errors[0].message).toBe(unauthorizedMessage);

  await client.login(fakeUser.email, fakeUser.password);

  response = await client.createPost(fakePost);

  expect(response.data).toEqual({
    createPost: success
  });

  done();
});
