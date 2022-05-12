import { supabaseClient } from '$lib/shared/api';
import { signOut } from '../..';

jest.mock('$app/env', () => ({ browser: false }), { virtual: true });
jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    auth: {
      user: jest.fn().mockName('supabaseClient.auth.user() from $lib/shared/api'),
      signOut: jest.fn().mockName('supabaseClient.auth.signOut() from $lib/shared/api'),
    },
  },
}));

it('calls the Supabase sign out method', () => {
  signOut();
  expect(supabaseClient.auth.signOut).toHaveBeenCalled();
});
