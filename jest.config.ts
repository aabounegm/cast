import { resolve } from 'path';

import type { Config } from '@jest/types';

const extensions = {
  jsAndTs: '\\.[jt]s$',
  svelte: '\\.svelte$',
};

/** Convert a mapping to have regular expressions as keys and values. */
function mapDirectories(dirMapping: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(dirMapping).map(([aliasDir, targetDir]) => [
      `^${aliasDir.replace('$', '\\$')}/(.*)$`,
      `${resolve(targetDir)}/$1`,
    ])
  );
}

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.{ts,svelte}', '!**.d.ts'],
  transform: {
    [extensions.jsAndTs]: 'babel-jest',
    [extensions.svelte]: ['svelte-jester/dist/transformer.cjs', { preprocess: true }],
  },
  moduleNameMapper: {
    ...mapDirectories({
      $lib: './src/lib',
    }),
    '^clsx$': '<rootDir>/src/lib/shared/lib/jest-hacks/clsx.jest.js',
    'lodash-es': 'lodash',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  setupFiles: ['dotenv/config', 'isomorphic-fetch/fetch-npm-node'],
  setupFilesAfterEnv: [
    'jest-extended/all',
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/src/lib/shared/lib/jest-hacks/icon-mocks.ts',
  ],
  testEnvironment: 'jsdom',
};

export default config;
