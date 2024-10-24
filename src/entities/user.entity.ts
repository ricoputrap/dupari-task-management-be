import { EnumUserRole } from "../configs/enums";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: EnumUserRole;
}

export default IUser;