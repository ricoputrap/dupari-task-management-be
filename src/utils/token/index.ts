import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../../configs/constants";

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}