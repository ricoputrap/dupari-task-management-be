import { InsertUser } from "../../../db/schema";
import { IOperationResult } from "../../types";
import { IUserRegistrationData } from "../schemas";

export interface ICreateUserResult extends IOperationResult<Omit<InsertUser, "password" | "createdAt" | "updatedAt">> {}

export interface IAuthService {
  register(userData: IUserRegistrationData): Promise<ICreateUserResult>;
}