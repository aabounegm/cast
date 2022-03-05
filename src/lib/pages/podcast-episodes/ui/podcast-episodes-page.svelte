<script lang="ts">
  import { EpisodeCard } from '$lib/widgets/episode';
  import { DownloadLink } from '$lib/features/download-episode';
  import { PodcastDisplay } from '$lib/entities/podcast';
  import { Podcast, podcastGet } from '$lib/shared/api';

  export let podcastID: number;
  let podcast: Podcast | null;

  $: {
    podcastGet(podcastID).then((r) => (podcast = r));
  }
</script>

{#if podcast}
  <PodcastDisplay {podcast}>
    <svelte:fragment slot="download-all">
      <DownloadLink downloadAll />
    </svelte:fragment>
  </PodcastDisplay>

  <div class="flex flex-col px-2 py-4 gap-3">
    {#each podcast.episodes as episode}
      <EpisodeCard {episode} />
    {/each}
  </div>
{:else}
  <p>Loading...</p>
{/if}
