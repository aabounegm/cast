import { getTranscript } from '../..';
import { fetchTranscript } from '../../api/fetch-transcript';

jest.mock('../../api/fetch-transcript', () => ({
  fetchTranscript: jest.fn().mockName('fetchTranscript() from $lib/entities/episode/api'),
}));

const sampleEpisodeIDforCache = 1;
const sampleEpisodeIDforError = 2;
const sampleTranscript = 'sample text';

it('fetches the transcript only the first time it is accessed', async () => {
  jest.mocked(fetchTranscript).mockImplementation(async () => sampleTranscript);

  expect(await getTranscript(sampleEpisodeIDforCache)).toBe(sampleTranscript);
  expect(await getTranscript(sampleEpisodeIDforCache)).toBe(sampleTranscript);

  expect(fetchTranscript).toHaveBeenCalledTimes(1);
});

it('rethrows fetching errors', async () => {
  const fetchingError = new Error();
  jest.mocked(fetchTranscript).mockImplementation(async () => {
    throw fetchingError;
  });
  expect(getTranscript(sampleEpisodeIDforError)).rejects.toBe(fetchingError);
});
