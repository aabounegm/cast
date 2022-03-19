import type { Episode } from '$lib/shared/api';
import { fetchTranscript } from '../api/fetch-transcript';

const transcripts = new Map<Episode['id'], string>();

export async function getTranscript(id: Episode['id']) {
  if (transcripts.has(id)) {
    return transcripts.get(id);
  }

  const transcript = await fetchTranscript(id);
  transcripts.set(id, transcript);
  return transcript;
}
