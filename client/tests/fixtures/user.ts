import faker from "faker";
import { IUserData } from "../../redux/types";

export const createFakeUser = () => {
  const user: IUserData = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    id: faker.random.alphaNumeric(20)
  };
  return user;
};
