import NotFoundError from "../../../errors/NotFoundError";
import UnauthorizedError from "../../../errors/UnauthorizedError";
import userRepository from "../../../repositories/user";
import { hashPassword } from "../../../utils/passwordHashing";
import { generateAccessToken, generateRefreshToken } from "../../../utils/token";
import { IUserLoginData } from "../schemas"
import { ILoginResult } from "./index.types";

const login = async (userData: IUserLoginData): Promise<ILoginResult> => {
  const result: ILoginResult = {
    accessToken: "",
    refreshToken: ""
  }

  // check if the user exists
  const withPassword = true;
  const user = await userRepository.getUserByEmail(userData.email, withPassword);

  // throw NotFoundError if user does not exist
  if (!user) {
    const errorMessage = `User with email ${userData.email} not found`;
    throw new NotFoundError(errorMessage)
  }

  // hash the user password
  const hashedPassword = await hashPassword(userData.password);

  // compare the hashed password with the one in the database
  // and throw an UnauthorizedError if they don't match
  if (hashedPassword !== user.password) {
    const errorMessage = "Password is incorrect";
    throw new UnauthorizedError(errorMessage);
  }

  // generate access and refresh tokens
  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email
  };
  result.accessToken = generateAccessToken(userWithoutPassword);
  result.refreshToken = generateRefreshToken(userWithoutPassword);

  // return the tokens
  return result;
}

export default login;