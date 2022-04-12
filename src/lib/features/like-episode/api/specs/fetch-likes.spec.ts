import { supabaseClient } from '$lib/shared/api';
import { fetchLikes } from '../fetch-likes';

jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    from: jest.fn().mockName('supabaseClient.from()').mockReturnThis(),
    select: jest.fn().mockName('supabaseClient.from().select()').mockReturnThis(),
    order: jest.fn().mockName('supabaseClient.from().select().order()').mockReturnThis(),
  },
}));

// See src/lib/entities/episode/api/specs/fetch-transcript.spec.ts for origins of this hack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { from, select, order } = supabaseClient as any;

it('fetches history from backend', () => {
  fetchLikes();

  expect(from).toHaveBeenCalledWith('favourites');
  expect(select).toHaveBeenCalledWith('episode_id');
  expect(order).toHaveBeenCalledWith('created_at', { ascending: false });
});
