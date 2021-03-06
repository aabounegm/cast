import type { SBPodcast } from '$lib/shared/api';

it('likes an episode then finds it in the library, persisting after reload', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('id, episodes (title)')
      .limit(1)
      .single();
    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    const titles = podcast.episodes.map(({ title }) => title);
    const episodeTitle = titles[0];
    expect(episodeTitle).to.be.not.undefined;
    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);

    // Like an episode
    cy.findByRole('article', { name: episodeTitle }).within(() => {
      cy.findByRole('button', {
        name: 'Like this episode',
      }).click();
    });

    cy.visitAndWaitForHydration('/library');

    // Expect the episode title to be in the library
    cy.findByRole('region', { name: /favorites/i }).within(() => {
      cy.findByRole('article', { name: episodeTitle });
    });

    // Reload the library page
    cy.visitAndWaitForHydration('/library');

    // Expect the episode title to still be in the library
    cy.findByRole('region', { name: /favorites/i }).within(() => {
      cy.findByRole('article', { name: episodeTitle });
    });
  });
});
