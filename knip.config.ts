import type { KnipConfig } from 'knip';

export default {
  project: ['src/**/*.{ts,tsx}'],
  ignoreDependencies: ['@microsoft/tsdoc', 'eslint-plugin-boundaries', 'msw'],
} satisfies KnipConfig;
