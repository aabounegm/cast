import DOMPurify from 'dompurify';
import type { Episode } from '$lib/shared/api';
import { fetchTranscript } from '../api/fetch-transcript';

const transcripts = new Map<Episode['id'], string | undefined>();

export async function getTranscript(id: Episode['id']) {
  if (transcripts.has(id)) {
    return transcripts.get(id);
  }

  const rawTranscript = await fetchTranscript(id);
  const sanitizedTranscript =
    rawTranscript !== undefined ? DOMPurify.sanitize(rawTranscript) : undefined;
  transcripts.set(id, sanitizedTranscript);
  return sanitizedTranscript;
}
