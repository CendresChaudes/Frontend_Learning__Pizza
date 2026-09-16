import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import { CEnvironment } from './environment.config';

export default defineConfig({
  test: {
    name: 'Integration-тесты (browser)',
    include: ['**/*.int.test.tsx'],
    reporters: 'dot',
    globals: true,
    passWithNoTests: true,
    watch: false,
    browser: {
      api: {
        port: 10000,
        strictPort: false,
      },
      provider: playwright(),
      instances: CEnvironment.IS_CI
        ? [{ browser: 'chromium' }, { browser: 'firefox' }, { browser: 'webkit' }]
        : [{ browser: 'chromium' }],
      enabled: true,
      headless: true,
      screenshotFailures: false,
    },
  },
});
