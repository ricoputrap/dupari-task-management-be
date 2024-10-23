import { EnumErrorName } from "../configs/enums";

class BadRequestError extends Error {
  
  constructor(message: string) {
    super(message);
    this.name = EnumErrorName.BAD_REQUEST;
    Error.captureStackTrace(this, this.constructor);
  }
}