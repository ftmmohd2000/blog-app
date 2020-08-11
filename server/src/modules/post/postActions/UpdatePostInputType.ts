import { InputType, Field } from "type-graphql";

@InputType()
export class UpdatePostInputType {
  @Field(() => String, { nullable: true })
  title: string;
  @Field(() => String, { nullable: true })
  content: string;
}
