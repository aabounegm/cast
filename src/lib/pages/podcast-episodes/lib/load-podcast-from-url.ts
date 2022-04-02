import type { Load } from '@sveltejs/kit';
import { podcastGet } from '$lib/entities/podcast';

export const loadPodcastFromURL: Load = async ({ params }) => {
  try {
    const podcast = await podcastGet(parseInt(params.id, 10));
    if (podcast === null) {
      return {
        status: 500,
        error: 'Faulty podcast, sorry! Try another one :)',
      };
    } else {
      return { props: { podcast } };
    }
  } catch {
    return {
      status: 301,
      redirect: '/',
    };
  }
};
