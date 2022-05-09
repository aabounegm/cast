import type { SBPodcast } from '$lib/shared/api';

it('allows to browse available podcasts', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcastTitles } = await supabase.from<SBPodcast>('podcasts').select('title');

    expect(podcastTitles).not.to.be.null;
    if (podcastTitles === null) return;

    cy.visitAndWaitForHydration('/');
    for (const { title } of podcastTitles) {
      cy.findAllByRole('article', { name: title });
    }
  });
});

it('allows to see all episodes of a podcast', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcastWithEpisodes } = await supabase
      .from<SBPodcast>('podcasts')
      .select('title, episodes (title)')
      .limit(1)
      .single();

    expect(podcastWithEpisodes).not.to.be.null;
    if (podcastWithEpisodes === null) return;

    cy.visitAndWaitForHydration('/');
    cy.findAllByRole('article', { name: podcastWithEpisodes.title }).first().click();
    for (const { title } of podcastWithEpisodes.episodes) {
      cy.findByRole('article', { name: title });
    }
  });
});
