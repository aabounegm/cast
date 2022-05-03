import Cookies from 'js-cookie';
import { CookieStorageAdapter } from '../cookie-storage-adapter';

jest.mock('$app/env', () => ({ browser: false }), { virtual: true });
jest.mock('js-cookie');

const cookieName = 'sample-cookie';
const cookieStorageAdapter = new CookieStorageAdapter(cookieName);

it('does not access cookies in a server context', () => {
  cookieStorageAdapter.set([]);
  cookieStorageAdapter.get();
  cookieStorageAdapter.remove();

  expect(Cookies.set).not.toHaveBeenCalled();
  expect(Cookies.get).not.toHaveBeenCalled();
  expect(Cookies.remove).not.toHaveBeenCalled();
});
