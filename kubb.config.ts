import type { Group, UserConfig } from '@kubb/core';
import { pluginFaker } from '@kubb/plugin-faker';
import { pluginMsw } from '@kubb/plugin-msw';
import { pluginTs } from '@kubb/plugin-ts';
import { defineConfig } from 'kubb/config';

const group: Group = {
  type: 'tag',
  name: ({ group }) => `${group}Service`,
};

export default defineConfig({
  input: './openapi.json',
  output: {
    format: 'prettier',
    path: './generated',
    postGenerate: ['python3 scripts/ts-no-check-kubb.py'],
    clean: true,
    lint: false,
  },
  plugins: [
    pluginFaker({
      group,
      locale: 'ru_RU',
      output: { path: 'mocks', banner: '// @ts-nocheck' },
    }),
    pluginMsw({
      group,
      output: { path: 'msw', mode: 'directory', banner: '// @ts-nocheck' },
      parser: 'faker',
      handlers: true,
    }),
    pluginTs({
      group,
      output: { path: 'types', banner: '// @ts-nocheck' },
    }),
  ],
}) satisfies UserConfig;
