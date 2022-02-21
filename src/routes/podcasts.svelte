<script lang="ts">
  import DownloadLink from '$lib/features/episode-presentation/ui/download-link.svelte';
  import EpisodeCard from '$lib/features/episode-presentation/ui/episode-card.svelte';
  import { play } from '$lib/entities/audio/model/audio-instance';
  import { getPodcast } from '$lib/entities/podcast';
  import type { Podcast } from '$lib/shared/api';

  let podcast: Podcast | undefined;

  $: {
    let id = 23424;
    getPodcast(id).then((r) => (podcast = r));
  }
</script>

{#if podcast}
  <div class="flex flex-row gap-4 p-4">
    <img class="w-24 h-24 rounded-xl" src={podcast.coverUrl} alt="cover" />
    <div class="flex flex-col gap-2 text-sm">
      <h3 class="text-xl font-bold">{podcast.title}</h3>
      <p>{podcast.author}</p>
      <p>
        {podcast.episodes.length} episodes /
        <DownloadLink>Download all</DownloadLink>
      </p>
    </div>
  </div>

  <div class="flex flex-col p-4 gap-4 items-stretch">
    {#each podcast.episodes as episode}
      <EpisodeCard
        {episode}
        onClickPlay={() => play(episode.audioUrl)}
      />
    {/each}
  </div>
{:else}
  <p>Loading...</p>
{/if}
