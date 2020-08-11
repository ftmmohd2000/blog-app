import { InputType, Field } from "type-graphql";

@InputType()
export class CreatePostInputType {
  @Field()
  title: string;
  @Field()
  content: string;
}
