import { InsertUser } from "../../../db/schema";
import { IUserLoginData, IUserRegistrationData } from "../schemas";

export interface ICreateUserResult extends Omit<InsertUser, "password" | "createdAt" | "updatedAt"> {}
export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthService {
  register(userData: IUserRegistrationData): Promise<ICreateUserResult>;
  login(userData: IUserLoginData): Promise<ILoginResult>;
}