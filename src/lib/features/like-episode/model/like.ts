import { supabaseClient, type Episode } from '$lib/shared/api';
import { persistentWritable, localStorageAdapter } from 'svelte-persistent-writable';
import { user } from '$lib/entities/user';

user.subscribe(async ($user) => {
  if (!$user) return;
  const likes = await supabaseClient
    .from('favourites')
    .select('episode_id')
    .order('created_at', { ascending: false });
  const ids = likes.data?.map((e) => e.episode_id);
  likesStore.set(new Set(ids ?? []));
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

async function addCloudLike(episodeId: number) {
  try {
    await supabaseClient.from('favourites').insert([
      {
        // eslint-disable-next-line camelcase
        episode_id: episodeId,
      },
    ]);
  } catch {
    return {
      status: 500,
      error: 'Server error. Check internet connection and ensure you are signed in.',
    };
  }
}

async function deleteCloudLike(episodeId: number) {
  try {
    await supabaseClient.from('favourites').delete().eq('episode_id', episodeId);
  } catch {
    return {
      status: 500,
      error: 'Server error. Check internet connection and ensure you are signed in.',
    };
  }
}

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
      deleteCloudLike(id);
    } else {
      likes.add(id);
      addCloudLike(id);
    }
    return likes;
  });
}
