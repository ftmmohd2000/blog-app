import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import { RegisterInputType } from "./register/RegisterInputType";
import { getCustomRepository } from "typeorm";

@Resolver()
class RegisterResolver {
  userRepository: UserRepository = getCustomRepository(UserRepository);

  @Mutation(() => Boolean)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInputType
  ) {
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = password;
    newUser.confirmed = true;

    try {
      await this.userRepository.saveOne(newUser);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default RegisterResolver;
