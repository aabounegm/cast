/* eslint-disable testing-library/await-async-query, testing-library/prefer-screen-queries */
import supabaseHostname from '../fixtures/supabase-hostname.json';
import samplePodcastJson from '../fixtures/sample-podcasts.json';
import type { Podcast } from '../../src/lib/shared/api/types';

const samplePodcast = samplePodcastJson as Podcast;

const podcastID = 1;
const titles = samplePodcast.episodes.map(({ title }) => title);

it('likes an episode then finds it in the library', () => {
  cy.intercept({ hostname: supabaseHostname, path: '/rest/v1/podcasts*' }, [samplePodcast]);
  cy.visitAndWaitForHydration(`/podcasts/${podcastID}`);

  // Like all the episodes
  cy.findAllByTestId('episode-card').each((card, index) => {
    const episode = samplePodcast.episodes[index];

    cy.wrap(card).within(() => {
      cy.findByText(episode.title).should('exist');
      cy.findByRole('button', {
        name: 'Like this episode',
      }).click();
    });
  });

  cy.visitAndWaitForHydration('/library');

  // Expect all episode titles to be in the library
  titles.forEach((title) => {
    cy.findByLabelText(/favorites/i).contains(title);
  });
});
