import { Resolver, Mutation, Ctx, Authorized, Arg } from "type-graphql";
import { MyContext } from "../../types/Context";
import {
  redisSessionPrefix,
  userSessionPrefix,
  success
} from "../../constants";
import { UserRepository } from "../../repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import { GraphQLError } from "graphql";
import { invalidCredentials, emailNotVerified } from "./login/errorMessages";
import { compare } from "bcryptjs";

@Resolver()
class LogoutResolver {
  userRepository: UserRepository = getCustomRepository(UserRepository);

  @Mutation(() => String, { nullable: true })
  async login(
    @Ctx() { req, redis }: MyContext,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new GraphQLError(invalidCredentials);
    }

    if (!user.confirmed) {
      throw new GraphQLError(emailNotVerified);
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new GraphQLError(invalidCredentials);
    }

    req.session!.userId = user.id;

    redis.lpush(`${userSessionPrefix}${user.id}`, req.sessionID!);

    return success;
  }

  @Authorized()
  @Mutation(() => String)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve, reject) => {
      req.session!.destroy((err) => {
        if (err) {
          reject(err);
        }

        res.clearCookie("qid");

        resolve(success);
      });
    });
  }

  @Mutation(() => String)
  @Authorized()
  async logoutAll(@Ctx() { res, redis, user }: MyContext) {
    const unresolved: Promise<number>[] = [];

    const sessionIDs = await redis.lrange(
      `${userSessionPrefix}${user!.id}`,
      0,
      -1
    );

    for (const id of sessionIDs)
      unresolved.push(redis.del(`${redisSessionPrefix}${id}`));

    await Promise.all(unresolved);

    await redis.del(`${userSessionPrefix}${user!.id}`);

    res.clearCookie("qid");

    return success;
  }
}

export default LogoutResolver;
