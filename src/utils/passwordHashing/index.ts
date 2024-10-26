import bcrypt from 'bcrypt';
import InternalServerError from '../../errors/InternalServerError';

const SALT_ROUND = 10;

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    return hashedPassword;
  }
  catch (error) {
    throw new InternalServerError('Failed to hash password');
  }
}