import { supabaseClient } from '$lib/shared/api';
import { likesStore } from '$lib/features/like-episode';
import { listeningHistory } from '$lib/features/listening-history';

export async function signOut() {
  await supabaseClient.auth.signOut();
  likesStore.set([]);
  listeningHistory.set([]);
}
