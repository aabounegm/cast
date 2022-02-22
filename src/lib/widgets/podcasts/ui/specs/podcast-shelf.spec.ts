import svelte from 'svelte-inline-compile';
import { render } from '@testing-library/svelte';

import { PodcastShelf } from '../..';
import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import type { Podcast } from '$lib/shared/api';

const podcasts: Podcast[] = [
  {
    id: 1,
    title: 'sample title',
    author: 'sample author',
    coverUrl: 'https://placekitten.com/128/128',
    episodes: [],
  },
  {
    id: 2,
    title: 'another title',
    author: 'another author',
    coverUrl: 'https://placekitten.com/256/256',
    episodes: [],
  },
];

it('renders all podcasts', () => {
  const { getByText } = render(
    useLocalVars(svelte`<PodcastShelf {podcasts} />`, [PodcastShelf, podcasts])
  );

  for (const podcast of podcasts) {
    expect(getByText(podcast.title)).toBeInTheDocument();
  }
});
