import { Resolver, Mutation, Authorized, Arg, Ctx } from "type-graphql";
import { GraphQLError } from "graphql";
import { postNotFound } from "./postActions/errorMessages";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../repositories/PostRepository";
import { success } from "../../constants";
import { MyContext } from "../../types/Context";

@Resolver()
class DeletePostResolver {
  postRepo = getCustomRepository(PostRepository);

  @Authorized()
  @Mutation(() => String, { nullable: true })
  async deletePost(@Ctx() { user }: MyContext, @Arg("id") id: string) {
    const deleteSuccess = await this.postRepo.deleteOne(id, user!.id);

    if (!deleteSuccess) {
      throw new GraphQLError(postNotFound);
    }

    return success;
  }
}

export default DeletePostResolver;
