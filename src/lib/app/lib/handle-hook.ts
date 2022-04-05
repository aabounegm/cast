import type { Handle } from '@sveltejs/kit';
import { setSecurityHeaders } from './security-headers';

export const handleHook: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  setSecurityHeaders(response);
  return response;
};
