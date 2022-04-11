import type { Episode } from '$lib/shared/api';
import { persistentWritable, localStorageAdapter } from 'svelte-persistent-writable';
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

/**
 * Toggles the like for the given episode. If the episode is liked, it will be
 *  removed, otherwise it will be added.
 * @param like The id of the episode whose like is to be toggled.
 */
export function toggleLike(like: Episode) {
  const { id } = like;
  likesStore.update((likes) => {
    if (likes.has(id)) {
      likes.delete(id);
      deleteCloudLike(id).then((e) => {
        if (e) alert(e.error);
      });
    } else {
      likes.add(id);
      addCloudLike(id).then((e) => {
        if (e) alert(e.error);
      });
    }
    return likes;
  });
}
