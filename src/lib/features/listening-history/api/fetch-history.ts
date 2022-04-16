import { supabaseClient } from '$lib/shared/api';

export async function fetchHistory() {
  const hist = await supabaseClient
    .from('history')
    .select('podcast_id')
    .order('created_at', { ascending: false });
  return hist.data?.map((e) => e.podcast_id);
}
