import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, ONE_DAY_IN_SECONDS, ONE_MINUTE_IN_SECONDS, ONE_SECOND_IN_MILLISECONDS, REFRESH_TOKEN_SECRET } from "../../configs/constants";
import IUser from "../../entities/user.entity";
import { IPayload } from "./index.types";

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

  /**
   * Generate an access token, expires in 15 minutes
   * @param {Object} user - The user object
   * @returns {string} The access token
   */
export const generateAccessToken = (user: Omit<IUser, "password">): string => {

  // current time in seconds
  const now = Math.floor(Date.now() / ONE_SECOND_IN_MILLISECONDS);

  // expires in 15 minutes
  const exp = now + ONE_MINUTE_IN_SECONDS * 15;

  const payload: IPayload = {
    iat: now,
    exp,
    user_id: user.id,
    email: user.email
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET);
}

  /**
   * Generate a refresh token, expires in 30 days
   * @param {Object} user - The user object
   * @returns {string} The refresh token
   */
export const generateRefreshToken = (user: Omit<IUser, "password">): string => {

  // current time in seconds
  const now = Math.floor(Date.now() / ONE_SECOND_IN_MILLISECONDS);

  // expires in 30 days
  const exp = now + ONE_DAY_IN_SECONDS * 30;

  const payload: IPayload = {
    iat: now,
    exp,
    user_id: user.id,
    email: user.email
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET);
}