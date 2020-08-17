import { Connection } from "typeorm";
import { success } from "../../../constants";
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

test("should update post", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();
  const fakePost = createFakePost();

  await client.register(fakeUser);
  await client.login(fakeUser.email, fakeUser.password);
  await client.createPost(fakePost);

  const id = (await client.me()).data.me.posts[0].id;
  const newTitle = "some new title";
  const newContent = "some new content";

  const response1 = await client.updatePost(id, {
    title: newTitle,
    content: newContent
  });
  const response2 = await client.me();

  expect(response1.data).toEqual({
    updatePost: success
  });

  expect(response2.data.me.posts[0].title).toBe(newTitle);
  expect(response2.data.me.posts[0].content).toBe(newContent);

  done();
});
