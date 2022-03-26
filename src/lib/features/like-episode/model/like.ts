import type { Episode } from '$lib/shared/api';
import {
  persistentWritable,
  localStorageAdapter,
  sessionStorageAdapter,
} from 'svelte-persistent-writable';
import { supabaseClient } from '$lib/shared/api';
import { snackbar } from '$lib/shared/ui/snackbar';
import { get } from 'svelte/store';

/**
 * The store containing set of episodes liked by the current user.
 */
export const likesStore = persistentWritable(new Map<Episode['id'], Episode>(), {
  storage: localStorageAdapter('likes', {
    serialize(likes: Map<Episode['id'], Episode>) {
      const episodes: Episode[] = Array.from(likes.values());
      return JSON.stringify(episodes);
    },
    deserialize(serialized: string) {
      const episodes: Episode[] = JSON.parse(serialized);
      return new Map(episodes.map((episode) => [episode.id, episode]));
    },
  }),
});

/**
 * Register that the user liked the given episode.
 * @param episode The id of the episode to be liked.
 */
export function addLike(episode: Episode) {
  likesStore.update((likes) => likes.set(episode.id, episode));
}

/**
 * Remove the like for the given episode.
 * @param episode The id of the episode whose like is to be removed.
 */
export function removeLike(episode: Episode) {
  likesStore.update((likes) => {
    likes.delete(episode.id);
    return likes;
  });
}

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
    } else {
      likes.set(id, like);
    }
    return likes;
  });
}
