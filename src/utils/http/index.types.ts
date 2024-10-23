import { Response } from "express";
import { EnumHttpStatus } from "../../configs/enums";

export interface Params {
  res: Response,
  status: EnumHttpStatus,
  success: boolean,
  message?: string,
  data?: any

  currentPage?: number,
  totalPages?: number,
  totalItems?: number,

  error?: Record<string, string>
}