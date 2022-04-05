import { supabaseClient, type Episode } from '$lib/shared/api';
import { persistentWritable, localStorageAdapter } from 'svelte-persistent-writable';
import { user } from '$lib/entities/user';
import { get } from 'svelte/store';

user.subscribe(async ($user) => {
  if (!$user) return;
  const hist = await supabaseClient
    .from('favourites')
    .select('episode_id')
    .order('created_at', { ascending: false })
    .eq('user_id', $user.id);
  const ids = hist.data?.map((e) => e.episode_id);
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
  if (!get(user)) return;
  await supabaseClient.from('favourites').insert([
    {
      // eslint-disable-next-line camelcase
      episode_id: episodeId,
    },
  ]);
}

async function deleteCloudLike(episodeId: number) {
  const u = get(user);
  if (!u) return;
  await supabaseClient.from('favourites').delete().eq('user_id', u.id).eq('episode_id', episodeId);
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
