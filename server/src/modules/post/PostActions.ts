import { Resolver, Mutation, Authorized, Ctx, Arg } from "type-graphql";
import { Post } from "../../entities/Post";
import Filter from "bad-words";
import { MyContext } from "../../types/Context";
import { PostInputType } from "./postActions/PostInputType";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../repositories/PostRepository";
import {
  titleProfanityError,
  contentProfanityError
} from "./postActions/errorMessages";
import { GraphQLError } from "graphql";
import { success } from "../../constants";

@Resolver(Post)
class PostActionsResolver {
  filter = new Filter();
  postRepo = getCustomRepository(PostRepository);

  @Authorized()
  @Mutation(() => String, { nullable: true })
  async createPost(
    @Ctx() { user }: MyContext,
    @Arg("postData") { title, content }: PostInputType
  ) {
    const post = new Post();
    post.title = title;

    if (this.filter.isProfane(title)) {
      throw new GraphQLError(titleProfanityError);
    }

    post.content = content;

    if (this.filter.isProfane(content)) {
      throw new GraphQLError(contentProfanityError);
    }

    post.author = user!;

    await this.postRepo.saveOne(post);

    return success;
  }
}

export default PostActionsResolver;
