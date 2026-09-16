import type { Config as StylelintConfig } from 'stylelint';

export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
    'stylelint-config-clean-order/error',
  ],
  ignoreFiles: ['node_modules/**', 'dist/**'],
} satisfies StylelintConfig;
