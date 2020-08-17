import { Connection } from "typeorm";
import { success } from "../../../constants";
import { TestClient } from "../../../test-utils/TestClient";
import { createTypeormConn } from "../../../utils/createTypeormConn";
import { createFakeUser } from "../../fixtures/user";

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeormConn();
});

afterAll(async () => {
  conn.close();
});

test("should register user", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();
  const response = await client.register(fakeUser);
  expect(response.data).toEqual({
    register: success
  });

  done();
});

test("should not register user with invalid email", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();
  const fakeUser2 = { ...fakeUser, email: "wrongEmailFormat" };
  let response = await client.register(fakeUser2);

  expect(response.data).toEqual({
    register: null
  });

  expect(response.errors).toHaveLength(1);
  expect(response.errors[0].message).toBe("Argument Validation Error");

  response = await client.register(fakeUser);

  expect(response.data).toEqual({
    register: success
  });

  expect(response.errors).toBeUndefined();

  done();
});

test("should not register user with invalid password", async (done) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const fakeUser = createFakeUser();
  const fakeUser2 = { ...fakeUser, password: "pwd" };
  let response = await client.register(fakeUser2);

  expect(response.data).toEqual({
    register: null
  });

  expect(response.errors).toHaveLength(1);
  expect(response.errors[0].message).toBe("Argument Validation Error");

  response = await client.register(fakeUser);

  expect(response.data).toEqual({
    register: success
  });

  expect(response.errors).toBeUndefined();

  done();
});
