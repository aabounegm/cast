<script lang="ts">
  import IconArrowBack from '~icons/ic/round-arrow-back';
  import { EpisodeCard } from '$lib/widgets/episode';
  import { DownloadLinkWithProgress } from '$lib/features/download-episode';
  import { PodcastDisplay } from '$lib/entities/podcast';
  import type { Podcast } from '$lib/shared/api';

  export let podcast: Podcast;
</script>

<nav class="flex p-2">
  <a
    href="/"
    class="px-3 py-2 text-sm font-extrabold flex items-center justify-center gap-3 rounded-full text-slate-100 hover:bg-slate-600 active:bg-slate-500"
  >
    <IconArrowBack class="w-5 h-5" />
    All podcasts
  </a>
</nav>

<PodcastDisplay {podcast}>
  <svelte:fragment slot="download-all">
    <DownloadLinkWithProgress urls={podcast.episodes.map((e) => e.audioUrl)} />
  </svelte:fragment>
</PodcastDisplay>

<div class="flex flex-col px-2 py-4 gap-3">
  {#each podcast.episodes as episode}
    <EpisodeCard {episode} />
  {/each}
</div>
