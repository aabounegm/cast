import type { Load } from '@sveltejs/kit';
import { podcastList } from '$lib/entities/podcast';

export const loadPodcasts: Load = async () => {
  try {
    const podcasts = await podcastList();
    return {
      props: { podcasts },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { podcasts: [] },
    };
  }
};
