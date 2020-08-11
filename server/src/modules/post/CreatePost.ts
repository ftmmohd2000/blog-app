import { Resolver, Authorized, Mutation, Ctx, Arg } from "type-graphql";
import { MyContext } from "../../types/Context";
import { CreatePostInputType } from "./postActions/CreatePostInputType";
import { Post } from "../../entities/Post";
import Filter from "bad-words";
import { GraphQLError } from "graphql";
import {
  titleProfanityError,
  contentProfanityError
} from "./postActions/errorMessages";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../repositories/PostRepository";
import { success } from "../../constants";

@Resolver(Post)
class CreatePostResolver {
  postRepo = getCustomRepository(PostRepository);
  filter = new Filter();

  @Authorized()
  @Mutation(() => String, { nullable: true })
  async createPost(
    @Ctx() { user }: MyContext,
    @Arg("postData") { title, content }: CreatePostInputType
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

export default CreatePostResolver;
