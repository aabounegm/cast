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

// See src/lib/entities/episode/api/specs/fetch-transcript.spec.ts for origins of this hack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { from, insert, delete: _delete, eq } = supabaseClient as any;

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
  expect(_delete).toHaveBeenCalled();
  expect(eq).toHaveBeenCalledWith('episode_id', sampleID);
});
