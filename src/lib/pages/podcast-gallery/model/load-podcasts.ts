import type { Load } from '@sveltejs/kit';
import { podcastList, podcasts } from '$lib/entities/podcast';

export const loadPodcasts: Load = async () => {
  try {
    podcasts.set(await podcastList());
  } catch (e) {
    console.error(e);
  }

  return {};
};
