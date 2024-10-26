import { ZodIssue, ZodSchema } from "zod";
import { sendResponse } from "../http";
import { Response } from "express";
import { EnumHttpStatus } from "../../configs/enums";
import logger from "../../configs/logger";

export const handleSchemaValidationError = (
  res: Response,
  validationErrors: ZodIssue[],
  logPrefix: string
) => {
  const errors: Record<string, string> = {};

  // extract the validation errors
  for (const error of validationErrors) {
    errors[error.path[0]] = error.message;
  }

  // log the error
  logger.error(`${logPrefix} Validation error: ${JSON.stringify(errors)}`);

  sendResponse({
    res,
    status: EnumHttpStatus.BAD_REQUEST,
    success: false,
    message: "Validation error",
    error: errors
  });
}

export const validateData = <T>(
  res: Response,
  data: T,
  schema: ZodSchema,
  logPrefix: string
): T | undefined => {
  const result = schema.safeParse(data);

  if (!result.success) {
    handleSchemaValidationError(res, result.error.issues, logPrefix);
    return;
  }

  return result.data;
}