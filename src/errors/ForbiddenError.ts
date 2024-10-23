import { EnumErrorName } from "../configs/enums";

class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = EnumErrorName.FORBIDDEN;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ForbiddenError;