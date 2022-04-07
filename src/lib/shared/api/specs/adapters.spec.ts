/* eslint-disable camelcase */
import { transformPodcastRequest, type SBPodcast } from '../adapters';

jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    from: jest
      .fn()
      .mockName('supabaseClient.from()')
      .mockImplementation((_tableName: string) => ({
        getPublicUrl: jest
          .fn()
          .mockName('supabaseClient.from().getPublicUrl()')
          .mockImplementation((fileName: string) => ({ data: fileName })),
      })),
  },
}));

const examplePodcast: SBPodcast = {
  id: 1,
  author: 'me',
  title: 'my podcast',
  coverArt: {
    name: 'cover.jpg',
  },
  episodes: [
    {
      id: 1,
      podcast_id: 1,
      episode_number: 3,
      title: 'episode 3',
      duration: 3,
      audio: { name: 'audio1.mp3' },
    },
    {
      id: 2,
      podcast_id: 1,
      episode_number: 2,
      title: 'episode 2',
      duration: 2,
      audio: { name: 'audio2.mp3' },
    },
    {
      id: 3,
      podcast_id: 1,
      episode_number: 1,
      title: 'episode 1',
      duration: 1,
      audio: { name: 'audio3.mp3' },
    },
  ],
};

it('returns the episodes sorted', () => {
  const transformedPodcast = transformPodcastRequest(examplePodcast);
  expect(transformedPodcast).not.toBeNull();
  const sortNumbers = transformedPodcast?.episodes.map((e) => e.episodeNumber);
  expect(sortNumbers).toEqual([1, 2, 3]);
});
