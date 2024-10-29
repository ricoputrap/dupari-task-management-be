import IUserRepository from "./index.types";
import getUserByEmail from "./getUserByEmail";
import createUser from "./createUser";

const userRepository: IUserRepository = {
  getUserByEmail,
  createUser
}

export default userRepository;