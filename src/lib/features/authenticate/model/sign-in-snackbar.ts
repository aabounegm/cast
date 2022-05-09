import { snackbar } from '$lib/shared/ui/snackbar';
import { supabaseClient } from '$lib/shared/api';

export function signInSnackbar() {
  const url = new URL(window.location.href);
  const shouldDisplaySnackbar = url.searchParams.get('snackbar') === 'true';
  if (shouldDisplaySnackbar) {
    const { data } = supabaseClient.auth.onAuthStateChange((_, session) => {
      if (session?.user == null) return;
      snackbar({
        text: `Successfully signed in as @${session.user.user_metadata.user_name}.\nYour likes will now be synced`,
      });
      // dirty hack for creating a unit test
      setTimeout(() => data?.unsubscribe(), 0);
    });
    url.searchParams.delete('snackbar');
    window.history.replaceState(null, '', url.toString());
  }
}
