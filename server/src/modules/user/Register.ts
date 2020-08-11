import { GraphQLError } from "graphql";
import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import { RegisterInputType } from "./register/RegisterInputType";
import { duplicateEmailError } from "./register/errorMessages";
import { success } from "../../constants";

@Resolver(User)
class RegisterResolver {
  userRepository: UserRepository = getCustomRepository(UserRepository);

  @Mutation(() => String, { nullable: true })
  async register(@Arg("data") inputData: RegisterInputType) {
    const newUser: User = { ...new User(), ...inputData, confirmed: true };

    try {
      await this.userRepository.saveOne(newUser);
      return success;
    } catch (error) {
      throw new GraphQLError(duplicateEmailError);
    }
  }
}

export default RegisterResolver;
