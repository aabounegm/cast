import { noop } from 'lodash-es';
import type { Session, User } from '@supabase/supabase-js';
import { user } from '$lib/entities/user';
import { supabaseClient } from '$lib/shared/api';
import { trackAuthStatus } from '../..';

jest.mock('$app/env', () => ({ browser: false }), { virtual: true });
jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    auth: {
      user: jest.fn().mockName('supabaseClient.auth.user() from $lib/shared/api'),
      onAuthStateChange: jest
        .fn()
        .mockName('supabaseClient.auth.onAuthStateChange() from $lib/shared/api')
        .mockImplementation(() => ({ error: null })),
    },
  },
}));
jest.mock('$lib/entities/user', () => ({
  user: {
    set: jest.fn().mockName('user.set() from $lib/entities/user'),
    subscribe: jest.fn().mockName('user.subscribe() from $lib/entities/user'),
  },
}));

/* eslint-disable camelcase */
const sampleUser: User = {
  id: '',
  aud: '',
  created_at: '',
  app_metadata: {},
  user_metadata: {},
};
const sampleSession: Session = { user: sampleUser, access_token: '', token_type: '' };
/* eslint-enable camelcase */

it('subscribes to the Supabase auth status tracker', () => {
  trackAuthStatus();
  expect(supabaseClient.auth.onAuthStateChange).toHaveBeenCalled();
});

it('returns a callback to unsubscribe', () => {
  expect(trackAuthStatus()).toHaveProperty('call');
});

it('alters the global user store', () => {
  jest.mocked(supabaseClient.auth.onAuthStateChange).mockImplementation((subscriber) => {
    subscriber('SIGNED_IN', sampleSession);
    return { data: { id: '', callback: noop, unsubscribe: noop }, error: null };
  });
  trackAuthStatus();
  expect(user.set).toHaveBeenCalledWith(sampleUser);
});
