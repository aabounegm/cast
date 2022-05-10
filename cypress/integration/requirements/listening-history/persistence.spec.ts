import type { SBPodcast } from '$lib/shared/api';

it('persists the listening history after reload when not authenticated', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('id, episodes (title)')
      .limit(1)
      .single();
    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    expect(podcast.episodes).to.have.length.gt(0);
    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);

    cy.findByRole('article', { name: podcast.episodes[0].title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });

    cy.visitAndWaitForHydration('/');

    cy.findByRole('feed', { name: /Recently listened/i }).within(() => {
      cy.findByRole('article', { name: podcast.title });
    });

    cy.visitAndWaitForHydration('/');

    cy.findByRole('feed', { name: /Recently listened/i }).within(() => {
      cy.findByRole('article', { name: podcast.title });
    });
  });
});
