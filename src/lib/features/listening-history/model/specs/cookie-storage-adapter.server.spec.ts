import Cookies from 'js-cookie';
import { cookieStorageAdapter } from '../cookie-storage-adapter';

jest.mock('$app/env', () => ({ browser: false }), { virtual: true });
jest.mock('js-cookie');

it('does not access cookies in a server context', () => {
  cookieStorageAdapter.set([]);
  cookieStorageAdapter.get();
  cookieStorageAdapter.remove();

  expect(Cookies.set).not.toHaveBeenCalled();
  expect(Cookies.get).not.toHaveBeenCalled();
  expect(Cookies.remove).not.toHaveBeenCalled();
});
