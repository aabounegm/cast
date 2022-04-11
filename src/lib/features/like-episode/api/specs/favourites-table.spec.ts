import { supabaseClient } from '$lib/shared/api';
import { addCloudLike, deleteCloudLike } from '../favourites-table';

const sampleID = 1;

jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    from: jest.fn().mockName('supabaseClient.from()').mockReturnThis(),
    insert: jest.fn().mockName('supabaseClient.from().insert()').mockReturnThis(),
    delete: jest.fn().mockName('supabaseClient.from().delete()').mockReturnThis(),
    eq: jest.fn().mockName('supabaseClient.from().delete().eq()').mockReturnThis(),
  },
}));

// We hacked our way out of mocking the `supabaseClient.from().select().eq().single()`
//   chain where each method returns an object of a new class. We're truly sorry.
/* aabounegm-disable */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { from, insert, delete: $delete, eq } = supabaseClient as any;

it('adds like to backend', () => {
  addCloudLike(sampleID);

  expect(from).toHaveBeenCalledWith('favourites');
  expect(insert).toHaveBeenCalledWith([
    {
      // eslint-disable-next-line camelcase
      episode_id: sampleID,
    },
  ]);
});

it('deletes like from backend', () => {
  deleteCloudLike(sampleID);

  expect(from).toHaveBeenCalledWith('favourites');
  expect($delete).toHaveBeenCalled(); // couldn't make this work
  expect(eq).toHaveBeenCalledWith('episode_id', sampleID);
});
