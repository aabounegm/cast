import { render, waitFor } from '@testing-library/svelte';
import { getTranscript } from '$lib/entities/episode';
import type { Episode } from '$lib/shared/api';
import { Transcript } from '../..';

jest.mock('$lib/entities/episode');

const sampleEpisode: Episode = {
  id: 1,
  title: 'test',
  podcastID: 2,
  audioUrl: 'test',
  duration: 1,
};
const sampleTranscript = 'test';

it('fetches the transcript on mount', () => {
  jest.mocked(getTranscript).mockImplementation(async () => sampleTranscript);
  render(Transcript, { episode: sampleEpisode });
  expect(getTranscript).toHaveBeenCalledWith(sampleEpisode.id);
});

it('parses the transcript content as Markdown', async () => {
  jest.mocked(getTranscript).mockImplementation(async () => `# ${sampleTranscript}`);
  const { getByRole } = render(Transcript, { episode: sampleEpisode });
  await waitFor(() => expect(getByRole('heading', { name: sampleTranscript })).toBeInTheDocument());
});

it('gracefully handles transcript fetch errors', async () => {
  jest.mocked(getTranscript).mockImplementation(async () => {
    throw new Error();
  });
  const { getByText } = render(Transcript, { episode: sampleEpisode });
  await waitFor(() => expect(getByText(/try refreshing/i)).toBeInTheDocument());
});
