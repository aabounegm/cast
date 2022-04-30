import Cookies from 'js-cookie';
import { browser } from '$app/env';

export const cookieName = 'listening-history';

/**
 * The adapter to store data in cookies on the client.
 *
 * On the server side, the operations are no-ops.
 */
export const cookieStorageAdapter = {
  get(): { value: number[] } | null {
    if (!browser) {
      return null;
    }

    const cookieValue = Cookies.get(cookieName);
    if (cookieValue === undefined) {
      return null;
    } else {
      try {
        return { value: JSON.parse(cookieValue) };
      } catch {
        return { value: [] };
      }
    }
  },
  set(ids: number[]) {
    if (!browser) {
      return;
    }

    Cookies.set(cookieName, JSON.stringify(ids), {
      expires: 99999,
      secure: true,
      sameSite: 'Strict',
    });
  },
  remove() {
    if (!browser) {
      return;
    }

    Cookies.remove(cookieName);
  },
};
