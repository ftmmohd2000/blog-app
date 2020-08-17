import { Connection } from "typeorm";
import { TestClient } from "../../../test-utils/TestClient";
import { createTypeormConn } from "../../../utils/createTypeormConn";
import { createFakeUser } from "../../fixtures/user";
import { unauthorizedMessage } from "../../../constants";

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeormConn();
});

afterAll(async () => {
  conn.close();
});

test("should retrieve me information", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();

  await client.register(fakeUser);
  await client.login(fakeUser.email, fakeUser.password);

  const response = await client.me();

  delete fakeUser.password;

  expect(response.data).toEqual({
    me: expect.objectContaining({
      ...fakeUser,
      posts: []
    })
  });
  done();
});

test("shouldn't retrieve me information for user not logged in", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();

  await client.register(fakeUser);

  // make Me query without logging in
  let response = await client.me();

  expect(response.data).toBeNull();

  expect(response.errors).toHaveLength(1);

  expect(response.errors[0].message).toBe(unauthorizedMessage);

  await client.login(fakeUser.email, fakeUser.password);

  // now log in and confirm that Me works
  response = await client.me();

  delete fakeUser.password;

  expect(response.data).toEqual({
    me: expect.objectContaining({
      ...fakeUser,
      posts: []
    })
  });

  done();
});
