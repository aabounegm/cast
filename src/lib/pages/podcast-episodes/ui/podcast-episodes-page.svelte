<script lang="ts">
  import IconArrowBack from '~icons/ic/round-arrow-back';
  import { EpisodeCard } from '$lib/widgets/episode';
  import { DownloadLinkWithProgress } from '$lib/features/download-episode';
  import { PodcastDisplay } from '$lib/entities/podcast';
  import type { Podcast } from '$lib/shared/api';

  export let podcast: Podcast;
</script>

<nav class="flex px-3 py-4">
  <a
    href="/"
    class="px-3 py-2 text-sm font-extrabold flex items-center justify-center gap-3 rounded-full text-slate-100 hover:bg-slate-700 active:bg-slate-600"
  >
    <IconArrowBack class="w-5 h-5" />
    All podcasts
  </a>
</nav>

<main class="px-6">
  <PodcastDisplay {podcast}>
    <svelte:fragment slot="download-all">
      <DownloadLinkWithProgress urls={podcast.episodes.map((e) => e.audioUrl)} downloadAll />
    </svelte:fragment>
  </PodcastDisplay>

  <section role="feed" class="flex flex-col gap-3">
    {#each podcast.episodes as episode}
      <EpisodeCard {episode} aria-setsize={podcast.episodes.length} />
    {/each}
  </section>
</main>
