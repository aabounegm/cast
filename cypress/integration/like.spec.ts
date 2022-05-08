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
    const episodeTitle = titles[0];
    expect(episodeTitle).to.be.not.undefined;
    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);

    // Like an episode
    cy.findAllByRole('article')
      .first()
      .within(() => {
        cy.findByText(episodeTitle).should('exist');
        cy.findByRole('button', {
          name: 'Like this episode',
        }).click();
      });

    cy.visitAndWaitForHydration('/library');

    // Expect the episode title to be in the library
    cy.findByLabelText(/favorites/i).contains(episodeTitle);
  });
});

it('can remove the like from a liked episode', () => {
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
    cy.findAllByRole('article')
      .first()
      .within(() => {
        cy.findByRole('button', {
          name: 'Like this episode',
        }).click();
      });

    cy.visitAndWaitForHydration('/library');

    // Unlike the episode
    cy.findAllByRole('article')
      .first()
      .within(() => {
        cy.findByRole('button', {
          name: 'Remove the like',
        }).click();
      });

    // Expect the episode title to not be in the library
    cy.findByRole('region', { name: /favorites/i })
      .contains(episodeTitle)
      .should('not.exist');
  });
});

it('persists liked episodes even if not authenticated', () => {
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
    cy.findAllByRole('article')
      .first()
      .within(() => {
        cy.findByText(episodeTitle).should('exist');
        cy.findByRole('button', {
          name: 'Like this episode',
        }).click();
      });

    cy.visitAndWaitForHydration('/library');

    // Expect the liked episode title to be in the library
    cy.findByLabelText(/favorites/i).contains(episodeTitle);

    // All of the above is basically the first test

    // Reload the library page
    cy.visitAndWaitForHydration('/library');

    // Expect the episode title to still be in the library
    cy.findByLabelText(/favorites/i).contains(episodeTitle);
  });
});
