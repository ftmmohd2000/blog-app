import { Repository, EntityRepository } from "typeorm";
import { Post } from "../entities/Post";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
