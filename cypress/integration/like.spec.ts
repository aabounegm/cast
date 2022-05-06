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

it.skip('can remove the like from a liked episode', () => {
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

    // Unlike all the episodes
    // cy.wait(3000);
    cy.findAllByTestId('episode-card').each((card) => {
      // cy.wait(1000);
      // TODO: this fails because of the rerendering on each unlike, causing
      //   cards to get removed from the DOM and be replaced with "Loading..."
      // This is why these dirty cy.wait()s are necessary, and still often fail
      cy.wrap(card).within(() => {
        cy.findByRole('button', {
          name: 'Remove the like',
        }).click();
      });
    });

    // Expect the episode titles to not be in the library
    titles.forEach((title) => {
      cy.findByLabelText(/favorites/i)
        .contains(title)
        .should('not.exist');
    });
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

    // All of the above is basically the first test

    // Reload the library page
    cy.visitAndWaitForHydration('/library');

    // Expect all episode titles to still be in the library
    titles.forEach((title) => {
      cy.findByLabelText(/favorites/i).contains(title);
    });
  });
});
