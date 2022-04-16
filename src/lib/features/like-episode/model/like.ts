import type { Episode } from '$lib/shared/api';
import {
  persistentWritable,
  localStorageAdapter,
  sessionStorageAdapter,
} from 'svelte-persistent-writable';
import { supabaseClient } from '$lib/shared/api';
import { snackbar } from '$lib/shared/ui/snackbar';
import { get } from 'svelte/store';
import { user } from '$lib/entities/user';
import { fetchLikes } from '../api/fetch-likes';
import { addCloudLike, deleteCloudLike } from '../api/favourites-table';

user.subscribe(async ($user) => {
  if ($user) {
    const ids = await fetchLikes();
    likesStore.set(new Set(ids ?? []));
  }
});

/**
 * The store containing set of episodes liked by the current user.
 */
export const likesStore = persistentWritable(new Set<number>(), {
  storage: localStorageAdapter('likes', {
    serialize(likes: Set<number>) {
      return JSON.stringify([...likes]);
    },
    deserialize(serialized: string) {
      const ids: number[] = JSON.parse(serialized);
      return new Set(ids);
    },
  }),
});

const hasReceivedSignInSnackbarStore = persistentWritable(false, {
  storage: sessionStorageAdapter('hasReceivedSignInSnackbar'),
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
        supabaseClient.auth.signIn(credentials, { redirectTo: window.location.href });
      },
    });
    hasReceivedSignInSnackbarStore.set(true);
  }
  const { id } = like;
  likesStore.update((likes) => {
    if (likes.has(id)) {
      likes.delete(id);
      deleteCloudLike(id).catch((e) => alert(e.message));
    } else {
      likes.add(id);
      addCloudLike(id).catch((e) => alert(e.message));
    }
    return likes;
  });
}
