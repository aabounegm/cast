import { noop } from 'lodash-es';
import { get } from 'svelte/store';
import { browser } from '$app/env';

import { listeningHistory } from '$lib/features/listening-history';
import { podcasts } from '$lib/entities/podcast';
import { notNull, type Podcast } from '$lib/shared/api';

const endlessWaiting = new Promise<Podcast[]>(noop);

export async function loadListeningHistory() {
  if (!browser) {
    return endlessWaiting;
  }

  const $listeningHistory = get(listeningHistory);
  const $podcasts = get(podcasts);
  return $listeningHistory
    .map((thisID) => $podcasts.find((podcast) => podcast.id === thisID) ?? null)
    .filter(notNull);
}
