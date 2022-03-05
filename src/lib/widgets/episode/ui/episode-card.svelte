<script lang="ts">
  import { PlaybackButton } from '$lib/features/playback-controls';
  import { LikeButton } from '$lib/features/like-episode';
  import { DownloadLink } from '$lib/features/download-episode';
  import { EpisodeCardShell } from '$lib/entities/episode';
  import { play, pause, audio } from '$lib/entities/audio';
  import type { Episode } from '$lib/shared/api';

  export let episode: Episode;

  $: playing = $audio?.src === episode.audioUrl && !$audio?.paused && !$audio?.ended;

  const playAudio = () => {
    if (playing) {
      pause();
    } else {
      play(episode.audioUrl);
    }
  };
</script>

<EpisodeCardShell {episode}>
  <svelte:fragment slot="play">
    <PlaybackButton {playing} on:click={playAudio} />
  </svelte:fragment>

  <svelte:fragment slot="download">
    <DownloadLink />
  </svelte:fragment>

  <svelte:fragment slot="like">
    <LikeButton {episode} />
  </svelte:fragment>
</EpisodeCardShell>
