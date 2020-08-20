import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../repositories/PostRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { MyContext } from "../../types/Context";
import { postNotFound } from "./postActions/errorMessages";

@Resolver()
class VoteResolver {
  postRepository = getCustomRepository(PostRepository);
  userRepository = getCustomRepository(UserRepository);

  @Authorized()
  @Mutation(() => Number)
  async vote(@Ctx() { user }: MyContext, @Arg("postId") postId: string) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new GraphQLError(postNotFound);
    }
    const found = user!.upvotedPosts.find((item) => item === postId);

    if (found) {
      user!.upvotedPosts = user!.upvotedPosts.filter((item) => item !== postId);
      post.votes--;
    } else {
      user!.upvotedPosts.push(postId);
      post.votes++;
    }

    await this.userRepository.saveOne(user!);
    await this.postRepository.saveOne(post);

    return post.votes;
  }
}

export default VoteResolver;
