import type { SBEpisode, SBPodcast, SBTranscript } from '$lib/shared/api';
import { marked } from 'marked';
import { convert } from 'html-to-text';

type EpisodeWithTranscripts = SBEpisode & { transcripts: SBTranscript[] };
const withoutTranscript = (episode: SBEpisode) =>
  (episode as EpisodeWithTranscripts).transcripts.length === 0;

it('allows to read the transcript of an episode when it is available', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcastWithTranscribedEpisodes } = await supabase
      .from<SBPodcast>('podcasts')
      .select('title, episodes!inner (title, transcripts!inner (episode_id, content))')
      .limit(1)
      .single();

    expect(podcastWithTranscribedEpisodes).not.to.be.null;
    if (podcastWithTranscribedEpisodes === null) return;

    cy.visitAndWaitForHydration('/');
    cy.findAllByRole('article', { name: podcastWithTranscribedEpisodes.title }).first().click();
    cy.findByRole('article', { name: podcastWithTranscribedEpisodes.episodes[0].title }).within(
      () => {
        cy.findByRole('button', { name: 'Play' }).click();
      }
    );
    cy.findByRole('article', { name: /^Now Playing/ }).click('left');
    cy.findByRole('button', { name: 'Read the transcript' }).should('be.visible').click();
    cy.findByText(
      convert(
        marked.parse(
          (podcastWithTranscribedEpisodes.episodes[0] as EpisodeWithTranscripts).transcripts[0]
            .content
        ),
        { wordwrap: false }
      )
    );
  });
});

it('gives an explanation when the transcript is not available', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcastsWithEpisodesAndTranscripts } = await supabase
      .from<SBPodcast>('podcasts')
      .select('title, episodes!inner (title, transcripts (episode_id))');

    const podcastWithUntranscribedEpisode = podcastsWithEpisodesAndTranscripts?.find((podcast) =>
      podcast.episodes.some(withoutTranscript)
    );
    const untranscribedEpisode = podcastWithUntranscribedEpisode?.episodes.find(withoutTranscript);
    expect(podcastWithUntranscribedEpisode).not.to.be.undefined;
    expect(untranscribedEpisode).not.to.be.undefined;
    if (podcastWithUntranscribedEpisode === undefined || untranscribedEpisode === undefined) return;

    cy.visitAndWaitForHydration('/');
    cy.findAllByRole('article', { name: podcastWithUntranscribedEpisode.title }).first().click();
    cy.findByRole('article', { name: untranscribedEpisode.title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });
    cy.findByRole('article', { name: /^Now Playing/ }).click('left');
    cy.findByRole('button', { name: 'Read the transcript' }).should('be.visible').click();
    cy.findByText('The transcript for this episode is not available yet', { exact: false });
  });
});
