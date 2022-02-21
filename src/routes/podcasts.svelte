<script lang="ts">
  import DownloadLink from '$lib/features/episode-presentation/ui/download-link.svelte';
  import EpisodeCard from '$lib/features/episode-presentation/ui/episode-card.svelte';
  import { getEpisodes, getPodcast } from 'src/loader-service';
  import type { PodcastEpisode, PodcastSeries } from 'src/podcast';

  import { audio, play } from '$lib/entities/audio/model/audio-instance';

  let podcast: PodcastSeries | undefined;
  let episodes: PodcastEpisode[] | undefined;

  $: {
    let id = '23424';
    getPodcast(id).then((r) => (podcast = r));
    getEpisodes(id).then((r) => (episodes = r));
  }
</script>

{#if podcast && episodes}
  <div class="flex flex-row gap-4 p-4">
    <img class="w-24 h-24 rounded-xl" src={podcast.coverUrl} alt="cover" />
    <div class="flex flex-col gap-2 text-sm">
      <h3 class="text-xl font-bold">{podcast.title}</h3>
      <p>{podcast.authors}</p>
      <p>
        {podcast.episodesNumber} episodes /
        <DownloadLink>Download all</DownloadLink>
      </p>
    </div>
  </div>

  <div class="flex flex-col p-4 gap-4 items-stretch">
    {#each episodes as episode}
      <EpisodeCard
        {episode}
        selected={$audio.src == episode.src}
        onClickPlay={() => play(episode.src)}
      />
    {/each}
  </div>
{:else}
  <p>Loading...</p>
{/if}
