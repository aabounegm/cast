<script lang="ts" context="module">
  import { PodcastGalleryPage, loadPodcastsAndTrending } from '$lib/pages/podcast-gallery';

  export const load = loadPodcastsAndTrending;
</script>

<svelte:head>
  <title>Podcast Gallery | Cast</title>
</svelte:head>

<PodcastGalleryPage />
