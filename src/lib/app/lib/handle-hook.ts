import type { Handle } from '@sveltejs/kit';

import { populateListeningHistory } from '$lib/features/listening-history';
import { populateLikes } from '$lib/features/like-episode';

import { setSecurityHeaders } from './security-headers';

export const handleHook: Handle = async ({ event, resolve }) => {
  populateListeningHistory(event.request);
  populateLikes(event.request);
  const response = await resolve(event);
  setSecurityHeaders(response);
  return response;
};
