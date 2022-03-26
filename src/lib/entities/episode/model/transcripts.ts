import DOMPurify from 'dompurify';
import type { Episode } from '$lib/shared/api';
import { fetchTranscript } from '../api/fetch-transcript';

const transcripts = new Map<Episode['id'], string>();

export async function getTranscript(id: Episode['id']) {
  if (transcripts.has(id)) {
    return transcripts.get(id) as string;
  }

  const rawTranscript = await fetchTranscript(id);
  const sanitizedTranscript = DOMPurify.sanitize(rawTranscript);
  transcripts.set(id, sanitizedTranscript);
  return sanitizedTranscript;
}
