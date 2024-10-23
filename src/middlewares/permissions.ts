import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token';
import { IPayload } from '../utils/token/index.types';
import { EnumResource, permissions } from '../configs/permissions';

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
        return res.status(401).json({ message: 'Authorization header not found.' });
      }

      const token = authHeader.split(' ')[1];

      // token not found
      if (!token) {
        return res.status(401).json({ message: 'Authorization token not found.' });
      }

      const payload = verifyAccessToken(token) as IPayload;

      // invalid access token
      if (!payload) {
        return res.status(401).json({ message: 'Invalid access token.' });
      }

      // TODO check if token is blacklisted

      // action not exist
      const allowedRoles = permissions[resource][action];
      if (!allowedRoles) {
        return res.status(403).json({ message: 'Invalid action.' });
      }

      // role not allowed
      if (!allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      // Grant access
      next();
    }
    catch (error: any) {
      
    }
  };
}
