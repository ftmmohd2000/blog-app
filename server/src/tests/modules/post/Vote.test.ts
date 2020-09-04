import { Connection } from "typeorm";
import { TestClient } from "../../../test-utils/TestClient";
import { createTypeormConn } from "../../../utils/createTypeormConn";
import { createFakePost } from "../../fixtures/post";
import { createFakeUser } from "../../fixtures/user";

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeormConn();
});

afterAll(async () => {
  conn.close();
});

test("should upvote and downvote post", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser1 = createFakeUser();
  const fakeUser2 = createFakeUser();
  const fakePost = createFakePost();

  await client.register(fakeUser1);
  await client.register(fakeUser2);
  await client.login(fakeUser1.email, fakeUser1.password);
  await client.createPost(fakePost);

  const response1 = await client.me();

  expect(response1.data.me.posts[0].votes).toBe(0);

  const postId = response1.data.me.posts[0].id;

  const response2 = await client.vote(postId);

  expect(response2.data).toEqual({
    vote: 1
  });

  await client.logout();

  await client.login(fakeUser2.email, fakeUser2.password);
  const response3 = await client.vote(postId);

  expect(response3.data.vote).toBe(2);

  const response4 = await client.vote(postId);

  expect(response4.data.vote).toBe(1);
  done();
}, 10000);
