import fetch from 'jest-mock-fetch';

global.fetch = fetch as unknown as typeof global.fetch;
