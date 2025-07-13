import { registerAs } from '@nestjs/config';
import * as path from 'path';

export const SRC_PATH = path.resolve(__dirname, '..');

export const commonConfig = registerAs('COMMON', () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
}));
