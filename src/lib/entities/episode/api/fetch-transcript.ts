import { supabaseClient, type Episode, type SBTranscript } from '$lib/shared/api';

export async function fetchTranscript(id: Episode['id']): Promise<string> {
  const res = await supabaseClient
    .from<SBTranscript>('transcripts')
    .select('content')
    .eq('episode_id', id)
    .single();

  if (res.error !== null) {
    throw res.error;
  }

  return res.data.content;
}
