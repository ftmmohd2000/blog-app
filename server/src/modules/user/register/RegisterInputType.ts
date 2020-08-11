import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class RegisterInputType {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(7)
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
