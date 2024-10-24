import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const ALLOWED_HOSTS: string = process.env.ALLOWED_HOSTS || 'http://localhost:3000';

export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || '';

export const SENTRY_DSN: string = process.env.SENTRY_DSN || '';

export const DATABASE_URL: string = process.env.DATABASE_URL || '';

export const ONE_DAY_IN_SECONDS = 86_400;
export const ONE_MINUTE_IN_SECONDS = 60;
export const ONE_SECOND_IN_MILLISECONDS = 1_000;