/* eslint-disable testing-library/await-async-query, testing-library/prefer-screen-queries */
import supabaseHostname from '../fixtures/supabase-hostname.json';
import samplePodcast from '../fixtures/sample-podcasts.json';

const podcastID = 1;

// Inspired by https://www.cypress.io/blog/2020/11/12/testing-application-in-offline-network-mode/
const goOffline = () => {
  return cy
    .log('**go online**')
    .then(() =>
      Cypress.automation('remote:debugger:protocol', {
        command: 'Network.enable',
      })
    )
    .then(() =>
      Cypress.automation('remote:debugger:protocol', {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: true,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      })
    );
};

const goOnline = () => {
  return cy.log('**go online**').then(() =>
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.emulateNetworkConditions',
      params: {
        offline: false,
        latency: -1,
        downloadThroughput: -1,
        uploadThroughput: -1,
      },
    })
  );
};

beforeEach(goOnline);
afterEach(goOnline);

it('can play a downloaded episode while offline', () => {
  cy.intercept({ hostname: supabaseHostname, path: '/rest/v1/podcasts*' }, [samplePodcast]);
  cy.visitAndWaitForHydration(`/podcasts/${podcastID}`);

  // Download all the episodes
  cy.findAllByTestId('episode-card').each((card) => {
    cy.wrap(card).within(() => {
      cy.findByText('Download', { trim: true }).click();

      // wait until it finishes downloading
      cy.findByText('Available offline', { exact: false, timeout: 8000 }).should('exist');
    });
  });

  goOffline();

  // Play the episodes
  cy.findAllByTestId('episode-card').each((card) => {
    cy.wrap(card).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();

      cy.expectPlayingAudio();

      cy.findByRole('button', { name: 'Pause' }).click();
    });
  });
});
