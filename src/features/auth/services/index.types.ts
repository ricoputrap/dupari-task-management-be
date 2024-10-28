import { InsertUser } from "../../../db/schema";
import { IUserRegistrationData } from "../schemas";

export interface ICreateUserResult extends Omit<InsertUser, "password" | "createdAt" | "updatedAt"> {}

export interface IAuthService {
  register(userData: IUserRegistrationData): Promise<ICreateUserResult>;
}