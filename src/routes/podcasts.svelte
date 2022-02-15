<script lang="ts">
  import DownloadLink from 'src/features/download-link.svelte';
  import EpisodeCard from 'src/features/episode-card.svelte';
  import type { PodcastEpisode, PodcastSeries } from 'src/podcast';

  export let podcast: PodcastSeries = {
    coverUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/7f/%D0%93%D0%B0%D0%B7%D0%B8-%D0%9C%D1%83%D1%85%D0%B0%D0%BC%D0%BC%D0%B0%D0%B4_%28%D1%81%D1%8B%D0%BD_%D0%A8%D0%B0%D0%BC%D0%B8%D0%BB%D1%8F%29.jpg',
    title: 'Bi Co Bo Co',
    authors: 'Divan',
    description: 'Saxlhi Mayarulal!',
    episodesNumber: 15,
    website: 'https://raxys.app',
  } as PodcastSeries;
  export let episodes: PodcastEpisode[] = [
    {
      title: 'Ahulgox',
      description: 'Qо kkanşşinab bakʼalda, Bоda ceve kʼancʼulev.',
      duration: 124,
    },
    { title: 'Bqqqi', description: 'Qо kkanşşinab bakʼalda, Bоda ceve kʼancʼulev.', duration: 42 },
  ];
</script>

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
    <EpisodeCard {episode} />
  {/each}
</div>

<div />
