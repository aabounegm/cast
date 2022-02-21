<script lang="ts">
  import { CardPlaybackButton } from '$lib/features/playback-controls';
  import { LikeButton } from '$lib/features/like-episode';
  import { DownloadLink } from '$lib/features/download-episode';
  import { EpisodeCardShell } from '$lib/entities/episode';
  import type { Episode } from '$lib/shared/api';

  export let episode: Episode;
  export let playing: boolean;
</script>

<EpisodeCardShell {episode}>
  <svelte:fragment slot="play">
    <CardPlaybackButton {playing} />
  </svelte:fragment>

  <svelte:fragment slot="download">
    <DownloadLink />
  </svelte:fragment>

  <svelte:fragment slot="like">
    <LikeButton liked={episode.favorite} />
  </svelte:fragment>
</EpisodeCardShell>
