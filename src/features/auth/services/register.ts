import { EnumHttpStatus } from "../../../configs/enums";
import logger from "../../../configs/logger";
import ConflictError from "../../../errors/ConflictError";
import UserRepository from "../../../repositories/user";
import { INewUser } from "../../../repositories/user/index.types";
import { hashPassword } from "../../../utils/passwordHashing";
import { IUserRegistrationData } from "../schemas";
import { ICreateUserResult } from "./index.types";

const LOG_PREFIX = '[AuthService] register';
const userRepository = new UserRepository();

const register = async (userData: IUserRegistrationData): Promise<ICreateUserResult> => {
  const result: ICreateUserResult = {
    success: true,
    status: EnumHttpStatus.CREATED
  }

  // todo: retrieve from redis
  // get the user to check if user already exists
  const withPassword = false;
  const existingUser = await userRepository.getUserByEmail(userData.email, withPassword);

  // user already exists
  if (existingUser) {
    const errorMessage = `User with email ${userData.email} already exists`;
    throw new ConflictError(errorMessage)
  }

  // hash the password
  const hashedPassword = await hashPassword(userData.password);

  // create the new user account
  const newUser: INewUser = await userRepository.createUser({
    ...userData,
    password: hashedPassword
  });

  result.data = newUser;
  result.message = "User registered successfully";

  const msg = `${LOG_PREFIX}: User registered successfully with email "${userData.email}" and id ${newUser.id}`;
  logger.info(msg);

  return result;
}

export default register;