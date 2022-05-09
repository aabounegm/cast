import type { SBPodcast } from '$lib/shared/api';

it('allows to play an episode by clicking the Play button in the episode card', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('*, episodes (*)')
      .limit(1)
      .single();

    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    expect(podcast.episodes).to.have.length.gt(0);

    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);
    cy.findByRole('article', { name: podcast.episodes[0].title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });
  });

  cy.expectPlayingAudio();
});

it('allows to play a different episode by clicking the Play button in another episode card', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcasts } = await supabase
      .from<SBPodcast>('podcasts')
      .select('id, title, episodes (title)');
    const podcastWithTwoEpisodes = podcasts?.find((podcast) => podcast.episodes.length > 1);

    expect(podcastWithTwoEpisodes).not.to.be.undefined;
    if (podcastWithTwoEpisodes === undefined) return;

    cy.visitAndWaitForHydration(`/podcasts/${podcastWithTwoEpisodes.id}`);
    cy.findByRole('article', { name: podcastWithTwoEpisodes.episodes[0].title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });

    cy.expectPlayingAudio();
    cy.get('audio').then((audioElement) => {
      const firstSrc = audioElement.attr('src');

      cy.findByRole('article', { name: podcastWithTwoEpisodes.episodes[1].title })
        .within(() => {
          cy.findByRole('button', { name: 'Play' }).click();
        })
        .then(() => {
          cy.expectPlayingAudio();
          const secondSrc = audioElement.attr('src');
          expect(secondSrc).not.to.be.equal(firstSrc);
        });
    });
  });
});

it('allows to pause and resume playback by clicking the Play button in the episode card', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('*, episodes (*)')
      .limit(1)
      .single();

    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    expect(podcast.episodes).to.have.length.gt(0);

    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);
    cy.findByRole('article', { name: podcast.episodes[0].title }).as('episodeCard');
  });

  cy.get('@episodeCard').within(() => {
    cy.findByRole('button', { name: 'Play' }).click();
  });
  cy.expectPlayingAudio();

  cy.get('@episodeCard').within(() => {
    cy.findByRole('button', { name: 'Pause' }).click();
  });
  cy.expectNoPlayingAudio();

  cy.get('@episodeCard').within(() => {
    cy.findByRole('button', { name: 'Play' }).click();
  });
  cy.expectPlayingAudio();
});

it('allows to pause and resume playback by clicking the Play button in the mini-player', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('*, episodes (*)')
      .limit(1)
      .single();

    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    expect(podcast.episodes).to.have.length.gt(0);

    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);
    cy.findByRole('article', { name: podcast.episodes[0].title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });
  });

  cy.expectPlayingAudio();
  cy.findByRole('article', { name: /Now Playing/ }).as('miniPlayer');

  cy.get('@miniPlayer').within(() => {
    cy.findByRole('button', { name: 'Pause' }).click();
  });
  cy.expectNoPlayingAudio();

  cy.get('@miniPlayer').within(() => {
    cy.findByRole('button', { name: 'Play' }).click();
  });
  cy.expectPlayingAudio();
});

it('allows to pause and resume playback by clicking the Play button in the Now Playing', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('*, episodes (*)')
      .limit(1)
      .single();

    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    expect(podcast.episodes).to.have.length.gt(0);

    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);
    cy.findByRole('article', { name: podcast.episodes[0].title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });

    cy.findByRole('article', { name: /Now Playing/ }).click('left');
    cy.findByRole('region', { name: podcast.episodes[0].title }).as('nowPlaying');
  });

  cy.expectPlayingAudio();

  cy.get('@nowPlaying').within(() => cy.findByRole('button', { name: 'Pause' }).click());
  cy.expectNoPlayingAudio();

  cy.get('@nowPlaying').within(() => cy.findByRole('button', { name: 'Play' }).click());
  cy.expectPlayingAudio();
});

it('allows to nudge the playback time by clicking nudge buttons in the mini-player', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('*, episodes (*)')
      .limit(1)
      .single();

    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    expect(podcast.episodes).to.have.length.gt(0);

    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);
    cy.get('audio').as('audio');
    cy.findByRole('article', { name: podcast.episodes[0].title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });
  });

  cy.findByRole('article', { name: /Now Playing/ }).as('miniPlayer');

  cy.get<HTMLAudioElement>('@audio').then((audioElement) => {
    const playbackTimeBefore = audioElement[0].currentTime;
    cy.expectPlayingAudio();
    cy.get('@miniPlayer')
      .within(() => {
        cy.findByRole('button', { name: 'Skip forward 30 seconds' }).click();
      })
      .then(() => {
        const playbackTimeAfter = audioElement[0].currentTime;
        expect(playbackTimeAfter).to.be.approximately(playbackTimeBefore + 30, 0.1);
      });
  });

  cy.get('@miniPlayer').within(() => {
    cy.findByRole('button', { name: 'Pause' }).click();
  });

  cy.get<HTMLAudioElement>('@audio').then((audioElement) => {
    const playbackTimeBefore = audioElement[0].currentTime;
    cy.get('@miniPlayer')
      .within(() => {
        cy.findByRole('button', { name: 'Replay the last 10 seconds' }).click();
      })
      .then(() => {
        const playbackTimeAfter = audioElement[0].currentTime;
        expect(playbackTimeAfter).to.be.equal(playbackTimeBefore - 10);
      });
  });
});

it('allows to nudge the playback time by clicking nudge buttons in the Now Playing', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('*, episodes (*)')
      .limit(1)
      .single();

    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    expect(podcast.episodes).to.have.length.gt(0);

    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);
    cy.findByRole('article', { name: podcast.episodes[0].title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });

    cy.findByRole('article', { name: /Now Playing/ }).click('left');
    cy.findByRole('region', { name: podcast.episodes[0].title }).as('nowPlaying');
  });

  cy.expectPlayingAudio();
  cy.get('audio').as('audio');

  cy.get<HTMLAudioElement>('@audio').then((audioElement) => {
    const playbackTimeBefore = audioElement[0].currentTime;
    cy.get('@nowPlaying')
      .within(() => {
        cy.findByRole('button', { name: 'Skip forward 30 seconds' }).click();
      })
      .then(() => {
        const playbackTimeAfter = audioElement[0].currentTime;
        expect(playbackTimeAfter).to.be.gte(playbackTimeBefore + 30);
      });
  });

  cy.get('@nowPlaying').within(() => {
    cy.findByRole('button', { name: 'Pause' }).click();
  });

  cy.get<HTMLAudioElement>('@audio').then((audioElement) => {
    const playbackTimeBefore = audioElement[0].currentTime;
    cy.get('@nowPlaying')
      .within(() => {
        cy.findByRole('button', { name: 'Replay the last 10 seconds' }).click();
      })
      .then(() => {
        const playbackTimeAfter = audioElement[0].currentTime;
        expect(playbackTimeAfter).to.be.equal(playbackTimeBefore - 10);
      });
  });
});

it('allows to control the audio speed in the Now Playing', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const { data: podcast } = await supabase
      .from<SBPodcast>('podcasts')
      .select('*, episodes (*)')
      .limit(1)
      .single();

    expect(podcast).to.be.not.null;
    if (podcast === null) return;
    expect(podcast.episodes).to.have.length.gt(0);

    cy.visitAndWaitForHydration(`/podcasts/${podcast.id}`);
    cy.findByRole('article', { name: podcast.episodes[0].title }).within(() => {
      cy.findByRole('button', { name: 'Play' }).click();
    });

    cy.findByRole('article', { name: /Now Playing/ }).click('left');
  });

  cy.get('audio').as('audio');

  cy.findByRole('button', { name: '1.0x' }).click();
  cy.get<HTMLAudioElement>('@audio').then((audioElement) => {
    expect(audioElement[0].playbackRate).to.be.equal(1.5);
  });

  cy.findByRole('button', { name: '1.5x' }).click();
  cy.get<HTMLAudioElement>('@audio').then((audioElement) => {
    expect(audioElement[0].playbackRate).to.be.equal(2);
  });

  cy.findByRole('button', { name: '2.0x' }).click();
  cy.get<HTMLAudioElement>('@audio').then((audioElement) => {
    expect(audioElement[0].playbackRate).to.be.equal(0.5);
  });

  cy.findByRole('button', { name: '0.5x' }).click();
  cy.get<HTMLAudioElement>('@audio').then((audioElement) => {
    expect(audioElement[0].playbackRate).to.be.equal(1);
  });

  cy.expectPlayingAudio();
});
