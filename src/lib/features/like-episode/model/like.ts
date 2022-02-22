import { persistentWritable, localStorageAdapter } from 'svelte-persistent-writable';

/**
 * The identifier for a like was chosen to be a simple integer representing the
 *   episode number since they will be unique anyway (judging by the Supabase schema).
 * This makes it more convenient to use with `Set`s since an object would have
 *   required a custom comparator function.
 */
type EpisodeId = number;

/**
 * The store containing set of episodes liked by the current user.
 */
export const likesStore = persistentWritable(new Set<EpisodeId>(), {
  storage: localStorageAdapter('likes', {
    serialize(likes: Set<EpisodeId>) {
      return JSON.stringify([...likes]);
    },
    deserialize(serialized: string) {
      return new Set(JSON.parse(serialized) as number[]);
    },
  }),
});

/**
 * Register that the user liked the given episode.
 * @param episode The id of the episode to be liked.
 */
export function addLike(episode: EpisodeId) {
  likesStore.update((likes) => likes.add(episode));
}

/**
 * Remove the like for the given episode.
 * @param episode The id of the episode whose like is to be removed.
 */
export function removeLike(episode: EpisodeId) {
  likesStore.update((likes) => (likes.delete(episode), likes));
}

/**
 * Toggles the like for the given episode. If the episode is liked, it will be
 *  removed, otherwise it will be added.
 * @param like The id of the episode whose like is to be toggled.
 */
export function toggleLike(like: EpisodeId) {
  likesStore.update((likes) => {
    if (likes.has(like)) {
      likes.delete(like);
    } else {
      likes.add(like);
    }
    return likes;
  });
}
