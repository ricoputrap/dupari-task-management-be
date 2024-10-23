import { EnumErrorName } from "../configs/enums";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = EnumErrorName.NOT_FOUND;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default NotFoundError;