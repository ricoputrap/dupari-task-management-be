import { eq } from "drizzle-orm";
import db from "../../db";
import { InsertUser, userTable } from "../../db/schema";
import IUser from "../../entities/user.entity";
import IUserRepository, { INewUser } from "./index.types";

class UserRepository implements IUserRepository {
  async getUserByEmail(email: string, withPassword = true): Promise<IUser | undefined> {
    const result = await db
      .select({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
        ...(withPassword ? { password: userTable.password } : {}),
      })
      .from(userTable)
      .where(
        eq(userTable.email, email)
      ) as IUser[];

    if (result.length == 0)
      return undefined;

    return result[0];
  }
  
  async createUser(user: InsertUser): Promise<INewUser> {
    const result = await db
      .insert(userTable)
      .values(user)
      .returning({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
      });

    return {
      ...result[0]
    };
  }
}

export default UserRepository;