import type { SBPodcast } from '$lib/shared/api';

// Inspired by https://www.cypress.io/blog/2020/11/12/testing-application-in-offline-network-mode/
const goOffline = () => {
  return cy
    .log('**go offline**')
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

// This test is skipped because there is a bug in Cypress that prevents goOnline and
//  goOffline from working properly with the Chrome driver.
//  Check https://github.com/cypress-io/cypress/issues/235#issuecomment-1009912083 for more info.
// Also, for some reason, the responses do not contain the `Content-Length` header, causing
//  it to seem like the download is completed immediately.
// Lastly, `expectPlayingAudio` is not working properly.
it.skip('can play a downloaded episode while offline', () => {
  // Find an existing podcast
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('*')
      .limit(1)
      .single();
    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);
  });

  // Download all the episodes
  cy.findAllByRole('article').each((card) => {
    cy.wrap(card).within(() => {
      cy.findByText('Download', { trim: true }).click();

      // wait until it finishes downloading
      cy.findByText('Available offline', { exact: false, timeout: 20000 }).should('exist');
    });
  });

  goOffline();

  // Play the episodes
  cy.findAllByRole('article').each((card) => {
    cy.wrap(card).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();

      cy.expectPlayingAudio();

      cy.findByRole('button', { name: 'Pause' }).click();
    });
  });
});
