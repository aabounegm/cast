import type { Load } from '@sveltejs/kit';
import { podcastList, podcasts } from '$lib/entities/podcast';

export const loadPodcasts: Load = async () => {
  try {
    podcasts.set(await podcastList());
    return {};
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      error:
        'This must be hard to be satisfied with. Reach the developers at GitHub (aabounegm/cast) and they will do their best to resolve this!',
    };
  }
};
