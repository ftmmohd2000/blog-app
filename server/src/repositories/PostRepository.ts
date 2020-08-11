import { Repository, EntityRepository } from "typeorm";
import { Post } from "../entities/Post";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async saveOne(post: Post): Promise<Post> {
    await super.save(post);
    return post;
  }
}
