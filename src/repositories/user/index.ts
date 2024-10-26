import { eq } from "drizzle-orm";
import db from "../../db";
import { InsertUser, userTable } from "../../db/schema";
import IUser from "../../entities/user.entity";
import IUserRepository, { INewUser } from "./index.types";
import { EnumUserRole } from "../../configs/enums";

class UserRepository implements IUserRepository {
  async getUserByEmail(email: string, withPassword = true): Promise<IUser | undefined> {
    const result = await db
      .select({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
        role: userTable.role,
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
        role: userTable.role
      });

    return {
      ...result[0],
      role: result[0].role as EnumUserRole
    };
  }
}

export default UserRepository;