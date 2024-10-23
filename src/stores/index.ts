/**
 * Stores blacklisted access tokens and refresh tokens
 * 
 * The key will be the token string.
 * The value will be in seconds, representing the unix timestamp
 * when the token will expire.
 * 
 * * Utilize CRON to clear the blacklisted tokens
 *   when they are expired
 * 
 * TODO: Utilize redis (in-memory database)
 */
export const blacklistedAccessTokens: Record<string, number> = {};
export const blacklistedRefreshTokens: Record<string, number> = {};