import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('DATABASE', () => ({
  HOST: process.env.DATABASE_HOST,
  PORT: process.env.DATABASE_PORT || 3306,
  USERNAME: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
}));
