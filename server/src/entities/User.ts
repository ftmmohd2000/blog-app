import { Field, ID, ObjectType, Root } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  getCustomRepository
} from "typeorm";
import { PostRepository } from "../repositories/PostRepository";
import { Post } from "./Post";

@ObjectType()
@Entity("users")
export class User {
  postRepository: PostRepository = getCustomRepository(PostRepository);

  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Column()
  password: string;

  @Field(() => Boolean)
  @Column()
  confirmed: boolean;

  @Field(() => [Post])
  async posts(@Root() { id }: User) {
    return this.postRepository.find({ where: { authorId: id } });
  }
}
