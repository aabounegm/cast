import { supabaseClient } from '$lib/shared/api';
import { addToCloudListeningHistory } from '../history-table';

const sampleID = 1;

jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    from: jest.fn().mockName('supabaseClient.from()').mockReturnThis(),
    insert: jest.fn().mockName('supabaseClient.from().insert()').mockReturnThis(),
  },
}));

// We hacked our way out of mocking the `supabaseClient.from().select().eq().single()`
//   chain where each method returns an object of a new class. We're truly sorry.
/* aabounegm-disable */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { from, insert } = supabaseClient as any;

it('fetches history from backend', () => {
  addToCloudListeningHistory(sampleID);

  expect(from).toHaveBeenCalledWith('history');
  expect(insert).toHaveBeenCalledWith([
    {
      // eslint-disable-next-line camelcase
      podcast_id: sampleID,
    },
  ]);
});
