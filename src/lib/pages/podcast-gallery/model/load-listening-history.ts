import { get } from 'svelte/store';

import { listeningHistory } from '$lib/features/listening-history';
import { podcasts } from '$lib/entities/podcast';
import { notNull } from '$lib/shared/api';

export function loadListeningHistory() {
  const $listeningHistory = get(listeningHistory);
  const $podcasts = get(podcasts);
  return $listeningHistory
    .map((thisID) => $podcasts.find((podcast) => podcast.id === thisID) ?? null)
    .filter(notNull);
}
