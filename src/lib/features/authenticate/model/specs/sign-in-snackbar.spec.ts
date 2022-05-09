import { supabaseClient } from '$lib/shared/api';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { screen } from '@testing-library/svelte';
import { signInSnackbar } from '$lib/features/authenticate';

Object.defineProperty(window, 'location', {
  value: {
    href: 'https://cast-iu.pages.dev/?snackbar=true',
  },
});

/* eslint-disable */
jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    auth: {
      onAuthStateChange: jest.fn(),
      user: jest.fn(),
    },
  },
}));

window.history.replaceState = jest.fn();

it('displays the sign in snackbar when the URL parameter is present and the user is signed in', () => {
  const event = null;
  const session = {
    user: {
      user_metadata: {
        user_name: 'test_person',
      },
    },
  };
  jest.mocked(supabaseClient.auth.onAuthStateChange).mockImplementationOnce((f) => {
    f(event as unknown as AuthChangeEvent, session as unknown as Session);
    return { data: null, error: null };
  });

  signInSnackbar();

  screen.findByText(
    `Successfully signed in as @${session.user.user_metadata.user_name}.\nYour likes will now be synced`
  );
});

it.todo(
  'does not display the sign in snackbar when the URL parameter is present and the user is not signed in'
);
