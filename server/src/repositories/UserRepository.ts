import { hash } from "bcryptjs";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveOne(user: User): Promise<User> {
    user.password = await hash(user.password, 12);
    await super.save(user);
    return user;
  }

  async updateOne(id: string, updates: Partial<User>) {
    const allowedUpdates = ["firstName", "lastName", "password"];

    const validUpdates = Object.keys(updates).every((key) =>
      allowedUpdates.includes(key)
    );

    if (!validUpdates) {
      return -1;
    }

    const user = await super.findOne({ where: { id } });

    if (!user) {
      return -2;
    }

    if (updates.password) {
      updates.password = await hash(updates.password, 12);
    }

    await super.update({ id }, updates);
    return 0;
  }

  async findById(id: string, eager?: boolean): Promise<User | undefined> {
    if (eager) {
      return super.findOne({ where: { id }, relations: ["posts"] });
    } else {
      return super.findOne({ where: { id } });
    }
  }

  async findByEmail(email: string, eager?: boolean): Promise<User | undefined> {
    if (eager) {
      return super.findOne({ where: { email }, relations: ["posts"] });
    } else {
      return super.findOne({ where: { email } });
    }
  }

  async deleteOne(id: string) {
    return !!(await super.delete(id)).affected;
  }
}
