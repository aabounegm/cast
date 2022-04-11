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

// We hacked our way out of mocking the `supabaseClient.from().select().eq().single()`
//   chain where each method returns an object of a new class. We're truly sorry.
/* aabounegm-disable */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { from, select, order } = supabaseClient as any;

it('fetches history from backend', () => {
  fetchLikes();

  expect(from).toHaveBeenCalledWith('favourites');
  expect(select).toHaveBeenCalledWith('episode_id');
  expect(order).toHaveBeenCalledWith('created_at', { ascending: false });
});
