<script lang="ts" context="module">
  import { PodcastGalleryPage, loadPodcasts } from '$lib/pages/podcast-gallery';

  export const load = loadPodcasts;
</script>

<svelte:head>
  <title>Podcast Gallery | Cast</title>
</svelte:head>

<PodcastGalleryPage />
