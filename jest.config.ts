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
    [extensions.svelte]: ['svelte-jester', { preprocess: true }],
  },
  moduleNameMapper: mapDirectories({
    $lib: './src/lib',
  }),
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
};

export default config;
