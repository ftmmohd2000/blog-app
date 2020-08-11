import { Resolver, Ctx, Query, Authorized } from "type-graphql";
import { MyContext } from "../../types/Context";
import { User } from "../../entities/User";

@Resolver()
class MeResolver {
  @Authorized()
  @Query(() => User)
  async me(@Ctx() { user }: MyContext) {
    return user;
  }
}

export default MeResolver;
