export enum EnumHttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum EnumHttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export enum EnumUserRole {
  OWNER = 'owner',
  MEMBER = 'member'
}

export enum EnumErrorName {
  BAD_REQUEST = 'BadRequestError',
  UNAUTHORIZED = 'UnauthorizedError',
  FORBIDDEN = 'ForbiddenError',
  NOT_FOUND = 'NotFoundError',
  CONFLICT = 'ConflictError',
  INTERNAL_SERVER_ERROR = 'InternalServerError'
}

export enum EnumLogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}