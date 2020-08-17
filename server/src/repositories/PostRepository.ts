import { EntityRepository, Repository } from "typeorm";
import { Post } from "../entities/Post";
import { UpdatePostInputType } from "../modules/post/postActions/UpdatePostInputType";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async saveOne(post: Post) {
    await super.save(post);
    return 0;
  }

  async findById(id: string) {
    return super.findOne({ where: { id } });
  }

  async findByAuthorId(authorId: string) {
    return super.find({ where: { authorId } });
  }

  async updateOne(id: string, updates: UpdatePostInputType): Promise<number> {
    const allowedUpdates = ["title", "content"];

    const validUpdates = Object.keys(updates).every((key) =>
      allowedUpdates.includes(key)
    );

    if (!validUpdates) {
      return -1;
    }

    let post = await this.findById(id);

    if (!post) {
      return -2;
    }

    post = { ...post, ...updates };
    await this.saveOne(post);
    return 0;
  }

  async deleteOne(id: string, authorId: string) {
    const userPost = await super.findOne({
      where: { authorId, id }
    });
    if (userPost) {
      super.delete({ id });
      return true;
    } else {
      return false;
    }
  }
}
