import { defineConfig, devices } from '@playwright/test';
import { CEnvironment } from './environment.config';

export default defineConfig({
  testDir: 'e2e',
  testMatch: '**/*.e2e.test.ts',
  outputDir: 'node_modules/.tests/e2e',
  reporter: 'dot',
  retries: CEnvironment.IS_CI ? 2 : 0,
  forbidOnly: CEnvironment.IS_CI,
  fullyParallel: true,
  projects: CEnvironment.IS_CI
    ? [
        {
          name: 'edge',
          use: { ...devices['Desktop Edge'], isMobile: false },
        },
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'], isMobile: false },
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'], isMobile: false },
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'], isMobile: false },
        },
      ]
    : [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'], isMobile: false },
        },
      ],
  use: {
    baseURL: `http://localhost:${CEnvironment.PORT}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm run start:dev',
    url: `http://localhost:${CEnvironment.PORT}`,
    reuseExistingServer: !CEnvironment.IS_CI,
  },
});
