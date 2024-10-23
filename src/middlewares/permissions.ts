import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token';
import { IPayload } from '../utils/token/index.types';
import { EnumResource, permissions } from '../configs/permissions';
import UnauthorizedError from '../errors/UnauthorizedError';
import { blacklistedAccessTokens } from '../stores';
import ForbiddenError from '../errors/ForbiddenError';
import { EnumLogLevel } from '../configs/enums';
import { errorHandler } from '../utils/http';

const LOG_PREFIX = "[MIDDLEWARES] checkPermission";

/**
 * Middleware to check if a user has the proper permissions to perform a specific action on a resource.
 *
 * @param action - The action the user wants to perform (e.g., 'get', 'create', 'edit', 'delete').
 * @param resource - The resource on which the action is to be performed (e.g., 'BOARD', 'TASK').
 * @returns A middleware function that checks for authorization and permission.
 *
 * The middleware extracts the authorization token from the request headers, verifies it, and checks if the user's role
 * is allowed to perform the specified action on the given resource. If any check fails, it responds with the appropriate
 * HTTP status and message. Otherwise, it grants access and proceeds to the next middleware.
 */
export function checkPermission(action: string, resource: EnumResource) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];

      // header not found
      if (!authHeader) {
        throw new UnauthorizedError('Authorization header not found.');
      }

      const token = authHeader.split(' ')[1];

      // token not found
      if (!token) {
        throw new UnauthorizedError('Authorization token not found.');
      }

      // check if token is blacklisted
      if (blacklistedAccessTokens[token]) {
        throw new UnauthorizedError('Access token is blacklisted.');
      }

      const payload = verifyAccessToken(token) as IPayload;

      // invalid access token
      if (!payload) {
        // return res.status(401).json({ message: 'Invalid access token.' });
        throw new UnauthorizedError('Invalid access token.');
      }

      // action not exist
      const allowedRoles = permissions[resource][action];
      if (!allowedRoles) {
        throw new ForbiddenError('Invalid action.');

      }

      // role not allowed
      if (!allowedRoles.includes(payload.role)) {
        throw new ForbiddenError('Access denied. Insufficient permissions.');
      }

      // Grant access
      next();
    }
    catch (error: any) {
      const logPrefix = `${EnumLogLevel.ERROR}  ${LOG_PREFIX}`;
      errorHandler(error, res, logPrefix);
    }
  };
}
