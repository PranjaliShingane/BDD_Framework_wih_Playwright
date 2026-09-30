// Centralized framework configuration for environment and runtime settings.
// This file loads the current environment file selected by TEST_ENV.
import * as path from 'path';
import * as dotenv from 'dotenv';

const envName = (process.env.TEST_ENV || 'qa').toLowerCase();
const envFilePath = path.resolve(__dirname, `./.env.${envName}`);

dotenv.config({ path: envFilePath, override: true });

export const config = {
  testEnv: envName,
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/',
  username: process.env.USERNAME || 'standard_user',
  password: process.env.PASSWORD || 'secret_sauce',
  browser: (process.env.BROWSER || 'chromium').toLowerCase(),
  headless: (process.env.HEADLESS || 'true').toLowerCase() !== 'false',
  timeout: Number(process.env.TIMEOUT || 30000)
};

export default config;
