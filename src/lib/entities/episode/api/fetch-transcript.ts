import { supabaseClient, type Episode, type SBTranscript } from '$lib/shared/api';

export async function fetchTranscript(id: Episode['id']): Promise<string | undefined> {
  const res = await supabaseClient
    .from<SBTranscript>('transcripts')
    .select('content')
    .eq('episode_id', id)
    .single();

  if (res.error !== null) {
    if (res.status === 406) {
      // The transcript is not available
      return undefined;
    } else {
      throw res.error;
    }
  }

  return res.data.content;
}
