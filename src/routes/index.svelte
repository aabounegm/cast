<script lang="ts" context="module">
  import { loadPodcasts } from '$lib/pages/podcast-gallery';

  export const load = loadPodcasts;
</script>

<script lang="ts">
  import { PodcastGalleryPage } from '$lib/pages/podcast-gallery';
  import { podcasts as podcastStore } from '$lib/entities/podcast';
  import type { Podcast } from '$lib/shared/api';

  export let podcasts: Podcast[];

  podcastStore.set(podcasts);
</script>

<svelte:head>
  <title>Home | Cast</title>
</svelte:head>

<PodcastGalleryPage />
