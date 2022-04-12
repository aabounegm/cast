import { supabaseClient, type SBEpisode } from '$lib/shared/api';
import { getEpisode } from '../get-episode';

/* eslint-disable camelcase */
const sampleID = 1;
const sampleRawEpisode: SBEpisode = {
  id: sampleID,
  title: 'sample title',
  audio: {
    name: 'sample name',
  },
  duration: 1,
  episode_number: 1,
  podcast_id: 1,
};
/* eslint-enable camelcase */

jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    from: jest.fn().mockName('supabaseClient.from()').mockReturnThis(),
    select: jest.fn().mockName('supabaseClient.from().select()').mockReturnThis(),
    eq: jest.fn().mockName('supabaseClient.from().select().eq()').mockReturnThis(),
    single: jest.fn().mockName('supabaseClient.from().select().eq().single()').mockReturnThis(),
  },
}));

// We hacked our way out of mocking the `supabaseClient.from().select().eq().single()`
//   chain where each method returns an object of a new class. We're truly sorry.
/* aabounegm-disable */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { from, select, eq, single } = supabaseClient as any;

it('constructs the query correctly', () => {
  single.mockImplementation(() => ({ error: null, data: sampleRawEpisode }));

  getEpisode(sampleID);

  expect(from).toHaveBeenCalledWith('episodes');
  expect(select).toHaveBeenCalledWith('*');
  expect(eq).toHaveBeenCalledWith('id', sampleID);
  expect(single).toHaveBeenCalled();
});

it('throws on fetching errors', () => {
  const errorObject = 'error';

  single.mockImplementation(() => ({ error: errorObject, data: null }));
  expect(getEpisode(sampleID)).rejects.toBe(errorObject);
});
