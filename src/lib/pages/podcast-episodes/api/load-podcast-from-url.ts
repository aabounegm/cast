import type { Load } from '@sveltejs/kit';
import { podcastGet } from '$lib/entities/podcast';

export const loadPodcastFromURL: Load = async ({ params }) => {
  try {
    const integerID = parseInt(params.id, 10);
    if (isNaN(integerID)) {
      throw integerID;
    }

    const podcast = await podcastGet(integerID);
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
