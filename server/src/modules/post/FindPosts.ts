import { Resolver, Query, Arg } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../repositories/PostRepository";
import { Post } from "../../entities/Post";

@Resolver(Post)
class FindPostsResolver {
  postRepo = getCustomRepository(PostRepository);

  @Query(() => Post)
  async post(@Arg("id") id: string) {
    return this.postRepo.findById(id);
  }

  @Query(() => [Post])
  async posts(@Arg("authorId") authorId: string) {
    return this.postRepo.findByAuthorId(authorId);
  }
}

export default FindPostsResolver;
