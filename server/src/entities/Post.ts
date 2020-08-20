import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("posts")
export class Post {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;

  @Column()
  authorId: string;

  @Column("int", { default: 0 })
  @Field()
  votes: number;
}
