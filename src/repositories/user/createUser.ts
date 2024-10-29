import db from "../../db";
import { InsertUser, userTable } from "../../db/schema";
import { INewUser } from "./index.types";

const createUser = async (user: InsertUser): Promise<INewUser> => {
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

export default createUser;