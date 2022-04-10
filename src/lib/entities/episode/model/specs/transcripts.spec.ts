import { getTranscript } from '../..';
import { fetchTranscript } from '../../api/fetch-transcript';

jest.mock('../../api/fetch-transcript', () => ({
  fetchTranscript: jest.fn().mockName('fetchTranscript() from $lib/entities/episode/api'),
}));

const sampleEpisodeIDforCache = 1;
const sampleEpisodeIDforError = 2;
const sampleEpisodeIDforSanitization = 3;
const sampleEpisodeIDforMissingTranscript = 4;
const sampleTranscript = 'sample text';
const maliciousTranscript = 'Hello <script>alert("xss")</script>world';
const sanitizedTranscript = 'Hello world';

it('fetches the transcript only the first time it is accessed', async () => {
  jest.mocked(fetchTranscript).mockImplementation(async () => sampleTranscript);

  expect(await getTranscript(sampleEpisodeIDforCache)).toBe(sampleTranscript);
  expect(await getTranscript(sampleEpisodeIDforCache)).toBe(sampleTranscript);

  expect(fetchTranscript).toHaveBeenCalledTimes(1);
});

it('correctly handles missing transcripts', async () => {
  jest.mocked(fetchTranscript).mockImplementation(async () => undefined);

  expect(await getTranscript(sampleEpisodeIDforMissingTranscript)).toBeUndefined();
});

it('rethrows fetching errors', async () => {
  const fetchingError = new Error();
  jest.mocked(fetchTranscript).mockImplementation(async () => {
    throw fetchingError;
  });
  expect(getTranscript(sampleEpisodeIDforError)).rejects.toBe(fetchingError);
});

it('removes malicious code from transcripts', () => {
  jest.mocked(fetchTranscript).mockResolvedValue(maliciousTranscript);

  expect(getTranscript(sampleEpisodeIDforSanitization)).resolves.toBe(sanitizedTranscript);
});
