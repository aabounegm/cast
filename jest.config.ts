import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  testEnvironment: 'jsdom',
};

export default config;
