import { InputType, Field } from "type-graphql";

@InputType()
export class PostInputType {
  @Field()
  title: string;
  @Field()
  content: string;
}
