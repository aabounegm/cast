<script lang="ts">
  import type { Episode } from '$lib/shared/api';
  import { PlaybackButton } from '$lib/features/playback-controls';
  import { LikeButton } from '$lib/features/like-episode';
  import { DownloadLink } from '$lib/features/download-episode';
  import { EpisodeCardShell, currentlyPlayingEpisode } from '$lib/entities/episode';
  import { paused } from '$lib/entities/audio';
  import { toggleGlobalPlayback } from '$lib/features/playback-controls';

  export let episode: Episode;

  const togglePlaying = () => {
    toggleGlobalPlayback(episode.audioUrl);
    currentlyPlayingEpisode.set(episode);
  };
</script>

<EpisodeCardShell {episode}>
  <svelte:fragment slot="play">
    <PlaybackButton
      playing={!$paused && $currentlyPlayingEpisode === episode}
      on:click={togglePlaying}
    />
  </svelte:fragment>

  <svelte:fragment slot="download">
    <DownloadLink />
  </svelte:fragment>

  <svelte:fragment slot="like">
    <LikeButton {episode} />
  </svelte:fragment>
</EpisodeCardShell>
