<script lang="ts">
  import { EpisodeCard } from '$lib/widgets/episode';
  import { DownloadLink } from '$lib/features/download-episode';
  import { PodcastDisplay } from '$lib/entities/podcast';
  import type { Podcast } from '$lib/shared/api';

  export let podcast: Podcast;
</script>

<PodcastDisplay {podcast}>
  <svelte:fragment slot="download-all">
    <DownloadLink downloadAll />
  </svelte:fragment>
</PodcastDisplay>

<div class="flex flex-col px-2 py-4 gap-3">
  {#each podcast.episodes as episode}
    <EpisodeCard {episode} playing={false} />
  {/each}
</div>
