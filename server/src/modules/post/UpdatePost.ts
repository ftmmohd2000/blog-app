import { Resolver, Authorized, Mutation, Arg } from "type-graphql";
import { Post } from "../../entities/Post";
import { UpdatePostInputType } from "./postActions/UpdatePostInputType";
import { GraphQLError } from "graphql";
import { invalidUpdates, postNotFound } from "./postActions/errorMessages";
import { success } from "../../constants";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../repositories/PostRepository";

@Resolver(Post)
class UpdatePostResolver {
  postRepo = getCustomRepository(PostRepository);

  @Authorized()
  @Mutation(() => String, { nullable: true })
  async updatePost(
    @Arg("id") id: string,
    @Arg("updates") updates: UpdatePostInputType
  ) {
    const retVal = await this.postRepo.updateOne(id, updates);
    switch (retVal) {
      case -1:
        throw new GraphQLError(invalidUpdates);
      case -2:
        throw new GraphQLError(postNotFound);
      default:
        return success;
    }
  }
}

export default UpdatePostResolver;
