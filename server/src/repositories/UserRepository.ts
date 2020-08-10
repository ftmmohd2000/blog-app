import { Repository, EntityRepository } from "typeorm";
import { User } from "../entities/User";
import { hash } from "bcryptjs";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveOne(user: User): Promise<User> {
    user.password = await hash(user.password, 12);
    await super.save(user);
    return user;
  }

  async updateOne(
    id: string,
    updates: Partial<User>
  ): Promise<User | undefined> {
    const allowedUpdates = ["firstName", "lastName", "password"];

    const validUpdates = Object.keys(updates).every(
      (key) => key in allowedUpdates
    );

    if (!validUpdates) {
      return undefined;
    }

    const user = await super.findOne({ where: { id } });

    if (!user) {
      return undefined;
    }

    await super.update(id, updates);

    return super.findOne({ where: { id } });
  }

  async findById(id: string): Promise<User | undefined> {
    return super.findOne({ where: { id } });
  }

  async deleteOne(id: string): Promise<boolean> {
    const count = (await super.delete(id)).affected;

    if (count) {
      return count > 0;
    } else {
      return false;
    }
  }
}
