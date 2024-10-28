import { EnumHttpStatus } from "../configs/enums";

/** @deprecated delete soon */
export interface IOperationResult<T> {
  success: boolean;
  status: EnumHttpStatus;
  data?: T;
  message?: string;
  error?: Record<string, string>;
}