import { AuthChecker, ResolverData } from "type-graphql";
import { MyContext } from "../types/Context";
import { UserRepository } from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";

export const customAuth: AuthChecker<MyContext, number> = ({
  context: { user }
}: ResolverData<MyContext>) => {
  return !!user;
};
