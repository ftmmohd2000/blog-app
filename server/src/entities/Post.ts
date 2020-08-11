import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  // @ManyToOne(() => User, (user) => user.posts)
  // author: User;

  @Column()
  @Field()
  authorId: string;
}
