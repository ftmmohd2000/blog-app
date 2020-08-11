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

  async updateOne(id: string, updates: Partial<User>) {
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

    if (updates.password) {
      updates.password = await hash(updates.password, 12);
    }

    await super.update(id, updates);
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

  async deleteOne(id: string): Promise<boolean> {
    const count = (await super.delete(id)).affected;

    if (count) {
      return count > 0;
    } else {
      return false;
    }
  }
}
