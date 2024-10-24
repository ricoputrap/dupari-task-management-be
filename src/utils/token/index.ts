import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, ONE_MINUTE_IN_SECONDS, ONE_SECOND_IN_MILLISECONDS } from "../../configs/constants";
import IUser from "../../entities/user.entity";
import { IPayload } from "./index.types";

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export const generateAccessToken = (user: Omit<IUser, "password">) => {

  // current time in seconds
  const now = Math.floor(Date.now() / ONE_SECOND_IN_MILLISECONDS);

  // expires in 15 minutes
  const exp = now + ONE_MINUTE_IN_SECONDS * 15;

  const payload: IPayload = {
    iat: now,
    exp,
    user_id: user.id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET);
}