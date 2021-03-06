import type { SBPodcast } from '$lib/shared/api';

describe('Applitools', () => {
  it('Navigates through the important pages', function () {
    cy.visitAndWaitForHydration('/');

    cy.eyesOpen({
      appName: 'Cast',
      testName: 'All pages',
      browser: {
        width: 360,
        height: 720,
        screenOrientation: 'portrait',
        name: 'chrome',
      },
    });

    cy.eyesCheckWindow({
      tag: 'Podcast Gallery page',
      target: 'window',
      fully: true,
    });

    cy.visitAndWaitForHydration('/library');

    cy.eyesCheckWindow({
      tag: 'Your Library page',
      target: 'window',
      fully: true,
    });

    cy.createSupabaseClient().then(async (supabase) => {
      const { data: podcast } = await supabase
        .from<SBPodcast>('podcasts')
        .select('id, episodes (title)')
        .limit(1)
        .single();
      expect(podcast).to.be.not.null;
      if (podcast === null) return;

      cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);

      cy.eyesCheckWindow({
        tag: 'Podcast Episodes page',
        target: 'window',
        fully: true,
      });

      cy.findAllByRole('button', { name: 'Play' }).first().click();
      cy.findByRole('article', { name: /Now Playing/ })
        .should('be.visible')
        .click('left');

      cy.findByRole('region', { name: podcast.episodes[0].title }).should('be.visible');
      cy.eyesCheckWindow({
        tag: 'Now playing widget',
        target: 'region',
        selector: 'section[aria-labelledby="now-playing-episode-title"]',
      });
    });

    cy.eyesClose();
  });
});
