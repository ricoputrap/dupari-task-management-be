import { EnumErrorName } from "../configs/enums";

class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = EnumErrorName.UNAUTHORIZED;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default UnauthorizedError;