import cookie from 'cookie';

import { listeningHistory } from './store';
import { cookieName } from './cookie-storage-adapter';

export function populateListeningHistory(request: Request) {
  const cookies = request.headers.has('Cookie')
    ? cookie.parse(request.headers.get('Cookie') as string)
    : {};

  listeningHistory.set(cookieName in cookies ? JSON.parse(cookies[cookieName]) : []);
}
