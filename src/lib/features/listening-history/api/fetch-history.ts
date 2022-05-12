import { supabaseClient } from '$lib/shared/api';
import type { SBHistoryEntry } from '$lib/shared/api/adapters';

export async function fetchHistory() {
  const hist = await supabaseClient
    .from<SBHistoryEntry>('history')
    .select('podcast_id')
    .order('created_at', { ascending: false });
  return hist.data?.map((e) => e.podcast_id);
}
