<script lang="ts">
  import type { Episode } from '$lib/shared/api';
  import { PlaybackButton } from '$lib/features/playback-controls';
  import { LikeButton } from '$lib/features/like-episode';
  import { DownloadLink } from '$lib/features/download-episode';
  import { EpisodeCardShell } from '$lib/entities/episode';
  import { paused, addToListeningHistory } from '$lib/entities/audio';
  import { toggleGlobalPlayback } from '$lib/features/playback-controls';

  export let episode: Episode;
  export let podcastId: number | null = null;

  const togglePlaying = () => {
    if ($paused && podcastId) {
      addToListeningHistory(podcastId);
    }

    toggleGlobalPlayback(episode.audioUrl);
  };
</script>

<EpisodeCardShell {episode}>
  <svelte:fragment slot="play">
    <PlaybackButton playing={!$paused} on:click={togglePlaying} />
  </svelte:fragment>

  <svelte:fragment slot="download">
    <DownloadLink />
  </svelte:fragment>

  <svelte:fragment slot="like">
    <LikeButton {episode} />
  </svelte:fragment>
</EpisodeCardShell>
