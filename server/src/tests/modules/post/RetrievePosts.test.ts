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

test("should retrieve post", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser1 = createFakeUser();
  const fakeUser2 = createFakeUser();
  const fakePost1 = createFakePost();
  const fakePost2 = createFakePost();

  await client.register(fakeUser1);
  await client.register(fakeUser2);

  await client.login(fakeUser1.email, fakeUser1.password);
  await client.createPost(fakePost1);

  const response1 = await client.me();
  const postId1 = response1.data.me.posts[0].id;

  await client.logout();

  await client.login(fakeUser2.email, fakeUser2.password);
  await client.createPost(fakePost2);

  const response2 = await client.me();
  const postId2 = response2.data.me.posts[0].id;

  delete fakeUser1.password;
  delete fakeUser2.password;

  // test to see retrieval of post by another author
  const response3 = await client.post(postId1);

  expect(response3.data).toEqual({
    post: {
      ...fakePost1,
      author: fakeUser1
    }
  });

  // test to see retrieval of post by oneself
  const response4 = await client.post(postId2);

  expect(response4.data).toEqual({
    post: {
      ...fakePost2,
      author: fakeUser2
    }
  });

  done();
});

test("should retreive all posts by author", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();
  const fakePost1 = createFakePost();
  const fakePost2 = createFakePost();
  const fakePost3 = createFakePost();

  await client.register(fakeUser);
  await client.login(fakeUser.email, fakeUser.password);
  delete fakeUser.password;
  await client.createPost(fakePost1);
  await client.createPost(fakePost2);
  await client.createPost(fakePost3);

  const response1 = await client.me();
  const userId = response1.data.me.id;

  const response2 = await client.posts(userId);

  expect(response2.data.posts).toHaveLength(3);
  expect(response2.data.posts).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        ...fakePost1,
        author: fakeUser
      }),
      expect.objectContaining({
        ...fakePost2,
        author: fakeUser
      }),
      expect.objectContaining({
        ...fakePost3,
        author: fakeUser
      })
    ])
  );

  await client.logout();

  done();
});

test("should retreive only author's posts", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser1 = createFakeUser();
  const fakeUser2 = createFakeUser();
  const fakePost1 = createFakePost();
  const fakePost2 = createFakePost();

  await client.register(fakeUser1);
  await client.register(fakeUser2);

  await client.login(fakeUser1.email, fakeUser1.password);
  await client.createPost(fakePost1);
  await client.logout();

  await client.login(fakeUser2.email, fakeUser2.password);
  await client.createPost(fakePost2);

  delete fakeUser2.password;

  const response = await client.me();

  expect(response.data.me.posts).toHaveLength(1);
  expect(response.data.me.posts[0]).toEqual(
    expect.objectContaining({
      ...fakePost2
    })
  );
  await done();
});
