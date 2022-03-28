import svelte from 'svelte-inline-compile';
import { render, screen } from '@testing-library/svelte';

import { PodcastTile } from '../..';
import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import type { Podcast } from '$lib/shared/api';

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
      render(component);

      expect(screen.getByText(podcast.title)).toBeInTheDocument();
      expect(screen.getByText(podcast.author)).toBeInTheDocument();
    });

    it('links to the full page of podcast', () => {
      render(component);

      expect(screen.getByRole('link')).toHaveAttribute('href', `/podcasts/${podcast.id}`);
    });
  });
}
