import { Connection } from "typeorm";
import { TestClient } from "../../../test-utils/TestClient";
import { createTypeormConn } from "../../../utils/createTypeormConn";
import { createFakeUser } from "../../fixtures/user";
import { success } from "../../../constants";
import { invalidCredentials } from "../../../modules/user/login/errorMessages";

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeormConn();
});

afterAll(async () => {
  conn.close();
});

test("should login user", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();

  await client.register(fakeUser);

  const response = await client.login(fakeUser.email, fakeUser.password);

  expect(response.data).toEqual({
    login: success
  });

  // check login state by querying me
  const response1 = await client.me();

  expect(response1.data).toBeTruthy();

  done();
});

test("shouldn't login unregistered user", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const { email, password } = createFakeUser();

  const response = await client.login(email, password);

  expect(response.data).toEqual({
    login: null
  });

  expect(response.errors).toHaveLength(1);
  expect(response.errors[0].message).toBe(invalidCredentials);

  // check login state by querying me
  const response1 = await client.me();

  expect(response1.data).toBeFalsy();

  done();
});

test("should logout user", async (done) => {
  const client1 = new TestClient(process.env.TEST_HOST as string);
  const client2 = new TestClient(process.env.TEST_HOST as string);

  const fakeUser = createFakeUser();

  await client1.register(fakeUser);

  await client1.login(fakeUser.email, fakeUser.password);
  await client2.login(fakeUser.email, fakeUser.password);

  // check login state by querying me
  let response1 = await client1.me();
  let response2 = await client2.me();

  expect(response1.data).toBeTruthy();
  expect(response2.data).toBeTruthy();

  const response = await client1.logout();
  expect(response.data).toEqual({
    logout: success
  });

  // check login state by querying me
  response1 = await client1.me();
  response2 = await client2.me();

  expect(response1.data).toBeFalsy();
  expect(response2.data).toBeTruthy();

  done();
});

test("should logout all sessions", async (done) => {
  const client1 = new TestClient(process.env.TEST_HOST as string);
  const client2 = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();

  await client1.register(fakeUser);

  await client1.login(fakeUser.email, fakeUser.password);
  await client2.login(fakeUser.email, fakeUser.password);

  // check login state by querying me
  let response1 = await client1.me();
  let response2 = await client1.me();

  expect(response1.data).toBeTruthy();
  expect(response2.data).toBeTruthy();

  const response = await client1.logoutAll();
  expect(response.data).toEqual({
    logoutAll: success
  });

  // check login state by querying me
  response1 = await client1.me();
  response2 = await client1.me();

  expect(response1.data).toBeFalsy();
  expect(response2.data).toBeFalsy();

  done();
});
