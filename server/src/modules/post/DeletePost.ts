import { Resolver, Mutation, Authorized, Arg } from "type-graphql";
import { GraphQLError } from "graphql";
import { postNotFound } from "./postActions/errorMessages";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../repositories/PostRepository";
import { success } from "../../constants";

@Resolver()
class DeletePostResolver {
  postRepo = getCustomRepository(PostRepository);

  @Authorized()
  @Mutation(() => String, { nullable: true })
  async deletePost(@Arg("id") id: string) {
    const deleteSuccess = await this.postRepo.deleteOne(id);

    if (!deleteSuccess) {
      throw new GraphQLError(postNotFound);
    }

    return success;
  }
}

export default DeletePostResolver;
