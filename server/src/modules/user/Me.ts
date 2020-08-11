import { Resolver, Ctx, Query, Authorized } from "type-graphql";
import { MyContext } from "../../types/Context";
import { User } from "../../entities/User";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

@Resolver(User)
class MeResolver {
  userRepo = getCustomRepository(UserRepository);

  @Authorized()
  @Query(() => User)
  async me(@Ctx() { user }: MyContext) {
    return this.userRepo.findById(user!.id, true);
  }
}

export default MeResolver;
