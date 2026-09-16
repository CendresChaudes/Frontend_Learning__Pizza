import { config as loadEnvironment } from 'dotenv';

loadEnvironment({ path: './.env.development.local' });

/* eslint-disable no-restricted-syntax */
const CEnvironment = {
  IS_CI: !!process.env.isCI,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_E2E: process.env.NODE_ENV === 'e2e',
  IS_MOCKING_ACTIVE: process.env.IS_MOCKING_ACTIVE === 'true',
  PORT: process.env.PORT ? Number(process.env.PORT) : 60000,
} as const;

export { CEnvironment };
