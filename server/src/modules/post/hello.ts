import { Resolver, Query } from "type-graphql";

@Resolver()
class HelloPostResolver {
  @Query(() => String)
  async helloPost() {
    return "Hello Post";
  }
}

export default HelloPostResolver;
