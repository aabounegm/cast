<script lang="ts" context="module">
  export { loadPodcastFromURL as load } from '$lib/pages/podcast-episodes';
</script>

<script lang="ts">
  import { PodcastEpisodesPage } from '$lib/pages/podcast-episodes';
  import { addPodcastToStore } from '$lib/entities/podcast';
  import type { Podcast } from '$lib/shared/api';

  export let podcast: Podcast;

  addPodcastToStore(podcast);
</script>

<svelte:head>
  <title>{podcast.title} | Cast</title>
</svelte:head>

<PodcastEpisodesPage {podcast} />
