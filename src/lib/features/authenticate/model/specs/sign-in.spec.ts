import { supabaseClient } from '$lib/shared/api';
import { signIn } from '../..';

jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    auth: {
      user: jest.fn().mockName('supabaseClient.auth.user() from $lib/shared/api'),
      signIn: jest.fn().mockName('supabaseClient.auth.signIn() from $lib/shared/api'),
    },
  },
}));

it('calls the Supabase sign in method with the GitHub provider and the current browser URL', () => {
  signIn();
  expect(supabaseClient.auth.signIn).toHaveBeenCalledWith(
    { provider: 'github' },
    { redirectTo: window.location.href }
  );
});
