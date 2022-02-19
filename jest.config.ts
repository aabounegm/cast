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

  transform: {
    [extensions.jsAndTs]: 'babel-jest',
    [extensions.svelte]: ['svelte-jester/dist/transformer.cjs', { preprocess: true }],
  },
  moduleNameMapper: {
    ...mapDirectories({
      $lib: './src/lib',
    }),
    '^clsx$': '<rootDir>/src/lib/shared/lib/jest-hacks/clsx.jest.js',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
};

export default config;
