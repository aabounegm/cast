import supabaseHostname from '../fixtures/supabase-hostname.json';
import samplePodcastJson from '../fixtures/sample-podcasts.json';
import type { Podcast } from '../../src/lib/shared/api/types';

const samplePodcast = samplePodcastJson as Podcast;

it.skip('downloads an episode, then refreshes to find the correct status', () => {
  cy.intercept({ hostname: supabaseHostname, path: '/rest/v1/podcasts*' }, samplePodcast);
  cy.visitAndWaitForHydration(`/podcasts/${samplePodcast.id}`);

  // TODO: pick one episode card
  // TODO: click download episode button
  // TODO: wait for download to finish

  cy.reload();

  // TODO: wait for status to be reported from the worker
  // TODO: assert that the status is "Available offline"
});
