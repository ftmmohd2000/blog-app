import { Connection } from "typeorm";
import { success } from "../../../constants";
import { TestClient } from "../../../test-utils/TestClient";
import { createTypeormConn } from "../../../utils/createTypeormConn";
import { createFakePost } from "../../fixtures/post";
import { createFakeUser } from "../../fixtures/user";
import { postNotFound } from "../../../modules/post/postActions/errorMessages";

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeormConn();
});

afterAll(async () => {
  conn.close();
});

test("should delete post", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);

  const fakeUser = createFakeUser();
  const fakePost = createFakePost();

  await client.register(fakeUser);
  await client.login(fakeUser.email, fakeUser.password);

  await client.createPost(fakePost);

  const response1 = await client.me();

  expect(response1.data.me.posts).toHaveLength(1);

  const postId = response1.data.me.posts[0].id;

  const response2 = await client.deletePost(postId);

  expect(response2.data).toEqual({
    deletePost: success
  });

  const response3 = await client.me();

  expect(response3.data.me.posts).toHaveLength(0);
  done();
});

test("should not delete other user's post", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser1 = createFakeUser();
  const fakeUser2 = createFakeUser();
  const fakePost = createFakePost();

  await client.register(fakeUser1);
  await client.register(fakeUser2);

  await client.login(fakeUser1.email, fakeUser1.password);
  await client.createPost(fakePost);

  const response1 = await client.me();
  const postId = response1.data.me.posts[0].id;

  await client.logout();

  await client.login(fakeUser2.email, fakeUser2.password);

  const response2 = await client.deletePost(postId);

  expect(response2.data).toEqual({
    deletePost: null
  });

  expect(response2.errors).toHaveLength(1);
  expect(response2.errors[0].message).toBe(postNotFound);

  await client.logout();

  await client.login(fakeUser1.email, fakeUser1.password);

  const response3 = await client.me();

  expect(response3.data.me.posts).toHaveLength(1);

  done();
});
