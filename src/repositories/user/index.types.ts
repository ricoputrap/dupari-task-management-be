import { InsertUser } from "../../db/schema";
import IUser from "../../entities/user.entity";

export type INewUser = Omit<IUser, "password">;

interface IUserRepository {
  getUserByEmail(email: string, withPassword?: boolean): Promise<IUser | undefined>;
  createUser(user: InsertUser): Promise<INewUser>;
}

export default IUserRepository;