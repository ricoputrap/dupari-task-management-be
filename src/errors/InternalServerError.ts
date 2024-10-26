import { EnumErrorName } from "../configs/enums";

class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = EnumErrorName.INTERNAL_SERVER_ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default InternalServerError;