import { EnumUserRole } from "../../configs/enums";

export interface IPayload {
  iat: number; // issued at
  exp: number; // expiration
  user_id: number;
  email: string;
  role: EnumUserRole;
}