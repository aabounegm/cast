import Cookies from 'js-cookie';
import { cookieName, cookieStorageAdapter } from '../cookie-storage-adapter';

jest.mock('$app/env', () => ({ browser: true }), { virtual: true });

const sampleIDs = [1, 2, 3, 4, 5, 6];

afterEach(() => {
  Cookies.remove(cookieName);
});

it('saves the value in the right cookie', () => {
  cookieStorageAdapter.set(sampleIDs);
  expect(JSON.parse(Cookies.get(cookieName) ?? '[]')).toEqual(sampleIDs);
});

it('reads the value from an existing cookie', () => {
  Cookies.set(cookieName, JSON.stringify(sampleIDs));
  expect(cookieStorageAdapter.get()).toEqual({ value: sampleIDs });
});

it('clears the right cookie', () => {
  Cookies.set(cookieName, JSON.stringify(sampleIDs));
  cookieStorageAdapter.remove();
  expect(Cookies.get(cookieName)).toEqual(undefined);
});
