import cookie from 'cookie';

import { listeningHistory } from './store';
import { cookieName } from './cookie-storage-adapter';

/**
 * Read the listening history from a cookie and write it to the store
 * on the server side to perform SSR.
 *
 * This does not affect the `listeningHistory` store on the client.
 */
export function populateListeningHistory(request: Request) {
  const cookies = request.headers.has('Cookie')
    ? cookie.parse(request.headers.get('Cookie') as string)
    : {};

  listeningHistory.set(cookieName in cookies ? JSON.parse(cookies[cookieName]) : []);
}
