import type { SBPodcast } from '$lib/shared/api';

it('likes an episode then finds it in the library', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('id, episodes (title)')
      .limit(1)
      .single();
    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    const titles = podcast.episodes.map(({ title }) => title);
    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);

    // Like all the episodes
    cy.findAllByTestId('episode-card').each((card, index) => {
      cy.wrap(card).within(() => {
        cy.findByText(titles[index]).should('exist');
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
});
