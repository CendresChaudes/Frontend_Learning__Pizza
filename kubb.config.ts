import type { Group, UserConfig } from '@kubb/core';
import { pluginFaker } from '@kubb/plugin-faker';
import { pluginFetch } from '@kubb/plugin-fetch';
import { pluginMsw } from '@kubb/plugin-msw';
import { pluginReactQuery } from '@kubb/plugin-react-query';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginZod } from '@kubb/plugin-zod';
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
    pluginFetch({
      output: { path: 'http', mode: 'directory', banner: '// @ts-nocheck' },
      group,
    }),
    pluginMsw({
      group,
      output: { path: 'msw', mode: 'directory', banner: '// @ts-nocheck' },
      parser: 'faker',
      handlers: true,
    }),
    pluginReactQuery({
      group,
      output: { path: 'tanstack', banner: '// @ts-nocheck' },
      hooks: false,
    }),
    pluginTs({
      group,
      output: { path: 'types', banner: '// @ts-nocheck' },
    }),
    pluginZod({
      group,
      output: { path: 'zod', banner: '// @ts-nocheck' },
    }),
  ],
}) satisfies UserConfig;
