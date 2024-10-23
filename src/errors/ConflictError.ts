import { EnumErrorName } from "../configs/enums";

class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = EnumErrorName.CONFLICT;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ConflictError;