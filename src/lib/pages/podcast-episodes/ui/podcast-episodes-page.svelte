<script lang="ts">
  import { EpisodeCard } from '$lib/widgets/episode';
  import { DownloadLink } from '$lib/features/download-episode';
  import { getPodcast } from '$lib/entities/podcast';
  import type { Podcast } from '$lib/shared/api';

  export let podcastID: number;
  let podcast: Podcast;

  $: {
    getPodcast(podcastID).then((r) => (podcast = r));
  }
</script>

{#if podcast}
  <div class="flex flex-row gap-4 p-4">
    <img class="w-24 h-24 rounded-xl" src={podcast.coverUrl} alt="" />
    <div class="flex flex-col gap-2 text-sm">
      <h3 class="text-xl font-bold">{podcast.title}</h3>
      <p>{podcast.author}</p>
      <p>
        {podcast.episodes.length} episodes /
        <DownloadLink downloadAll />
      </p>
    </div>
  </div>

  <div class="flex flex-col p-4 gap-4 items-stretch">
    {#each podcast.episodes as episode}
      <EpisodeCard {episode} playing={false} />
    {/each}
  </div>
{:else}
  <p>Loading...</p>
{/if}
