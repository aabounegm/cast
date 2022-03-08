import svelte from 'svelte-inline-compile';
import { render } from '@testing-library/svelte';

import { PodcastTile } from '../..';
import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import type { Podcast } from '$lib/shared/types';

const podcast: Podcast = {
  id: 1,
  title: 'sample title',
  author: 'sample author',
  coverUrl: 'https://placekitten.com/128/128',
  episodes: [],
};

const components = {
  'Small tile': useLocalVars(svelte`<PodcastTile {podcast} />`, [PodcastTile, podcast]),
  'Large tile': useLocalVars(svelte`<PodcastTile large {podcast} />`, [PodcastTile, podcast]),
};

for (const [name, component] of Object.entries(components)) {
  describe(name, () => {
    it('renders the title and the author', () => {
      const { getByText } = render(component);

      expect(getByText(podcast.title)).toBeInTheDocument();
      expect(getByText(podcast.author)).toBeInTheDocument();
    });

    it('links to the full page of podcast', () => {
      const { getByRole } = render(component);

      expect(getByRole('link').getAttribute('href')).toBe(`/podcasts/${podcast.id}`);
    });
  });
}
