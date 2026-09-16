import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'Unit-тесты (node)',
    include: ['**/*.unit.test.ts'],
    environment: 'node',
    reporters: 'dot',
    globals: true,
    passWithNoTests: true,
    watch: false,
  },
});
