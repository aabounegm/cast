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

// See src/lib/entities/episode/api/specs/fetch-transcript.spec.ts for origins of this hack
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
