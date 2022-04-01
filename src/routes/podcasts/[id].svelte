<script lang="ts" context="module">
  export { loadPodcastFromURL as load } from '$lib/pages/podcast-episodes';
</script>

<script lang="ts">
  import { PodcastEpisodesPage } from '$lib/pages/podcast-episodes';
  import type { Podcast } from '$lib/shared/api';
  import { podcasts as podcastStore } from '$lib/entities/podcast';

  export let podcast: Podcast | undefined;

  if (podcast) {
    podcastStore.update((podcasts) => {
      if (!podcasts.some((p) => p.id === podcast!.id)) {
        podcasts.push(podcast!);
      }
      return podcasts;
    });
  }
</script>

{#if podcast !== undefined}
  <PodcastEpisodesPage {podcast} />
{:else}
  Invalid URL parameter
{/if}
