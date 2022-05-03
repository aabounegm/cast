import Cookies from 'js-cookie';
import { browser } from '$app/env';
import type { ItemStorage } from 'svelte-persistent-writable';

/**
 * The adapter to store data in cookies on the client.
 *
 * On the server side, the operations are no-ops.
 */
export class CookieStorageAdapter implements ItemStorage<number[]> {
  private cookieName: string;

  constructor(cookieName: string) {
    this.cookieName = cookieName;
  }

  get(): { value: number[] } | null {
    if (!browser) {
      return null;
    }

    const cookieValue = Cookies.get(this.cookieName);
    if (cookieValue === undefined) {
      return null;
    } else {
      try {
        return { value: JSON.parse(cookieValue) };
      } catch {
        return { value: [] };
      }
    }
  }

  set(ids: number[]) {
    if (!browser) {
      return;
    }

    Cookies.set(this.cookieName, JSON.stringify(ids), {
      expires: 99999,
      secure: true,
      sameSite: 'Strict',
    });
  }

  remove() {
    if (!browser) {
      return;
    }

    Cookies.remove(this.cookieName);
  }
}
