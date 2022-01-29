// @ts-check
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.svelte$": ["svelte-jester", {
      preprocess: true,
    }],
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "svelte",
  ],
  testEnvironment: 'jsdom',
};

export default config;
