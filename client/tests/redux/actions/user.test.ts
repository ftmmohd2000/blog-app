import { loginAction, logoutAction } from "../../../redux/actions/user";
import { createFakeUser } from "../../fixtures/user";
import { LOGIN_TYPE, LOGOUT_TYPE } from "../../../redux/constants";

test("should return login action", () => {
  const data = createFakeUser();
  const action = loginAction(data);
  expect(action).toEqual({
    type: LOGIN_TYPE,
    data
  });
});

test("should return logout action", () => {
  const action = logoutAction();
  expect(action).toEqual({
    type: LOGOUT_TYPE
  });
});
