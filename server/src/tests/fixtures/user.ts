import faker from "faker";

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const createFakeUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
});
