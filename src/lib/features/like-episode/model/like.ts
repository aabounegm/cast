import { type Episode, supabaseClient } from '$lib/shared/api';
import { persistentWritable, localStorageAdapter } from 'svelte-persistent-writable';
import { snackbar } from '$lib/shared/ui/snackbar';
import { get } from 'svelte/store';
import { CookieStorageAdapter } from '$lib/shared/lib';

import { fetchLikes } from '../api/fetch-likes';
import { addCloudLike, deleteCloudLike } from '../api/favourites-table';
import { cookieName } from './cookie-name';

supabaseClient.auth.onAuthStateChange(async (event, session) => {
  if (session?.user) {
    const ids = await fetchLikes();
    likesStore.set(ids ?? []);
  } else if (event === 'SIGNED_OUT') {
    likesStore.set([]);
  }
});

/**
 * The store containing set of episodes liked by the current user.
 */
export const likesStore = persistentWritable<number[]>([], {
  storage: new CookieStorageAdapter(cookieName),
});

const hasReceivedSignInSnackbarStore = persistentWritable(false, {
  storage: localStorageAdapter('hasReceivedSignInSnackbar'),
});

/**
 * Toggles the like for the given episode. If the episode is liked, it will be
 *  removed, otherwise it will be added.
 * @param like The id of the episode whose like is to be toggled.
 */
export function toggleLike(like: Episode) {
  const user = supabaseClient.auth.user();

  if (user === null && !get(hasReceivedSignInSnackbarStore)) {
    snackbar({
      text: 'Your likes will only be visible on this device. To synchronize your favorite podcasts, please sign in.',
      buttonText: 'Sign in',
      callback: () => {
        const credentials = { provider: 'github' } as const;
        const url = new URL(window.location.href);
        url.searchParams.append('snackbar', 'true');
        supabaseClient.auth.signIn(credentials, { redirectTo: url.toString() });
      },
    });
    hasReceivedSignInSnackbarStore.set(true);
  }
  const { id } = like;
  likesStore.update((likes) => {
    if (likes.includes(id)) {
      likes = likes.filter((thisID) => thisID !== id);
      deleteCloudLike(id).catch((e) => alert(e.message));
    } else {
      likes.unshift(id);
      addCloudLike(id).catch((e) => alert(e.message));
    }
    return likes;
  });
}
