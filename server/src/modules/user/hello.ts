import { Resolver, Query } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}

export default HelloResolver;
