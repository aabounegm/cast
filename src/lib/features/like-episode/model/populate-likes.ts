import cookie from 'cookie';

import { likesStore } from './like';
import { cookieName } from './cookie-name';

/**
 * Read the listening history from a cookie and write it to the store
 * on the server side to perform SSR.
 *
 * This does not affect the `listeningHistory` store on the client.
 */
export function populateLikes(request: Request) {
  const cookies = request.headers.has('Cookie')
    ? cookie.parse(request.headers.get('Cookie') as string)
    : {};

  likesStore.set(cookieName in cookies ? JSON.parse(cookies[cookieName]) : []);
}
