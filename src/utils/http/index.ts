import { Response } from "express";
import * as Sentry from "@sentry/node"

import { Params } from "./index.types";
import { EnumErrorName, EnumHttpStatus } from "../../configs/enums";
import logger from "../../configs/logger";

export const sendResponse = ({
  res,
  status,
  success,
  message = "",
  data,
  error,
  currentPage,
  totalPages,
  totalItems
}: Params) => {
  res.status(status).json({
    success,
    message,
    data,
    error,
    currentPage,
    totalPages,
    totalItems
  });
}

/**
 * Handles any errors that occur in a request, logging them and sending an appropriate response
 * @param error The error that occurred
 * @param res The Express response object
 * @param logPrefix The log prefix to use when logging the error
 */
export const errorHandler = (error: any, res: Response, logPrefix: string) => {
  let message: string = error.message || "An unexpected error has occurred.";
  let status: EnumHttpStatus = EnumHttpStatus.INTERNAL_SERVER_ERROR;

  switch (error.name) {
    case EnumErrorName.BAD_REQUEST:
      status = EnumHttpStatus.BAD_REQUEST;
      break;
    case EnumErrorName.UNAUTHORIZED:
      status = EnumHttpStatus.UNAUTHORIZED;
      break;
    case EnumErrorName.FORBIDDEN:
      status = EnumHttpStatus.FORBIDDEN;
      break;
    case EnumErrorName.NOT_FOUND:
      status = EnumHttpStatus.NOT_FOUND;
      break;
    case EnumErrorName.CONFLICT:
      status = EnumHttpStatus.CONFLICT;
      break;
    case EnumErrorName.INTERNAL_SERVER_ERROR:
      status = EnumHttpStatus.INTERNAL_SERVER_ERROR;
    default:
      break;
  }

  logger.error(`${logPrefix}: ${message}`);

  Sentry.captureException(error);

  sendResponse({ res, status, success: false, message });
}