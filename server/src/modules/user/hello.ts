import { Resolver, Query } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async helloUser() {
    return "Hello User";
  }
}

export default HelloResolver;
