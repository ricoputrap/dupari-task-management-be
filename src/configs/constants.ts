import dotenv from 'dotenv';

export const PORT = process.env.PORT || 3000;
export const ALLOWED_HOSTS: string = process.env.ALLOWED_HOSTS || 'http://localhost:3000';