import type { SBPodcast } from '$lib/shared/api';

it('synchronizes listening history with the account on Supabase', () => {
  let samplePodcast!: SBPodcast;

  cy.login().then(async ([_auth, supabase]) => {
    const response = await supabase
      .from<SBPodcast>('podcasts')
      .select('*, episodes (*)')
      .limit(1)
      .single();
    expect(response.data).to.be.not.null;
    samplePodcast = response.data as SBPodcast;
    expect(samplePodcast.episodes.length).to.be.greaterThan(0);

    cy.visitAndWaitForHydration(`/podcasts/${samplePodcast.id}`);
    cy.findByRole('article', { name: samplePodcast.episodes[0].title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });

    cy.expectPlayingAudio();

    cy.visitAndWaitForHydration('/');

    cy.findByRole('feed', { name: 'Recently listened' }).within(() => {
      cy.findByRole('article', { name: samplePodcast.title });
    });
  });

  cy.clearCookies();

  cy.login().then(async ([_auth, supabase]) => {
    cy.visitAndWaitForHydration('/');
    cy.findByRole('feed', { name: 'Recently listened' }).within(() => {
      cy.findByRole('article', { name: samplePodcast.title });
    });

    await supabase.from<SBPodcast>('history').delete();
  });
});
