<script lang="ts">
  import { PlaybackButton } from '$lib/features/playback-controls';
  import { LikeButton } from '$lib/features/like-episode';
  import { DownloadLinkWithProgress } from '$lib/features/download-episode';
  import { EpisodeCardShell, currentlyPlayingEpisode } from '$lib/entities/episode';
  import { paused, playAfterLoading, pause } from '$lib/entities/audio';
  import type { Episode } from '$lib/shared/api';

  export let episode: Episode;

  const replaceAudioAndPlay = () => {
    currentlyPlayingEpisode.set(episode);
    playAfterLoading();
  };
</script>

<EpisodeCardShell {episode}>
  <svelte:fragment slot="play">
    <PlaybackButton
      playing={!$paused && $currentlyPlayingEpisode === episode}
      on:play={replaceAudioAndPlay}
      on:pause={pause}
    />
  </svelte:fragment>

  <svelte:fragment slot="download">
    <DownloadLinkWithProgress urls={[episode.audioUrl]} />
  </svelte:fragment>

  <svelte:fragment slot="like">
    <LikeButton {episode} />
  </svelte:fragment>
</EpisodeCardShell>
