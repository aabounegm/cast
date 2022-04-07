import naughtyStrings from 'blns';
import { podcastGet } from '$lib/entities/podcast';
import { loadPodcastFromURL } from '../load-podcast-from-url';
import type { LoadInput } from '@sveltejs/kit/types/internal';

jest.mock('$lib/entities/podcast');

it('does not let anything but integers in IDs through', () => {
  for (const naughtyString of naughtyStrings) {
    loadPodcastFromURL({ params: { id: naughtyString } } as unknown as LoadInput<
      Record<string, string>
    >);
  }
  for (const call of jest.mocked(podcastGet).mock.calls) {
    expect(call).toBeInteger();
  }
});
