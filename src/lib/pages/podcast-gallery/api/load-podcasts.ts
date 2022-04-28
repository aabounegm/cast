import type { Load } from '@sveltejs/kit';
import { dev } from '$app/env';

import { fetchTrending } from '$lib/features/trending-podcasts';
import { podcastList, podcasts as allPodcastStore, trendingPodcasts } from '$lib/entities/podcast';
import { notNull } from '$lib/shared/api';

export const loadPodcastsAndTrending: Load = async () => {
  try {
    const [podcasts, trendingIDs] = await Promise.all([podcastList(), fetchTrending()]);

    allPodcastStore.set(podcasts);
    trendingPodcasts.set(
      trendingIDs
        .map((thisID) => podcasts.find((podcast) => podcast.id === thisID) ?? null)
        .filter(notNull)
    );

    return {};
  } catch (e) {
    if (dev) {
      console.error(e);
    }
    return {
      status: 500,
      error:
        'This must be hard to be satisfied with. Reach the developers at GitHub (aabounegm/cast) and they will do their best to resolve this!',
    };
  }
};
