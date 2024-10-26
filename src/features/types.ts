import { EnumHttpStatus } from "../configs/enums";

export interface IOperationResult<T> {
  success: boolean;
  status: EnumHttpStatus;
  data?: T;
  message?: string;
  error?: Record<string, string>;
}