import { eq } from "drizzle-orm";
import db from "../../db";
import { userTable } from "../../db/schema";
import IUser from "../../entities/user.entity";

const getUserByEmail = async (
  email: string,
  withPassword = true
): Promise<IUser | undefined> => {
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

export default getUserByEmail;