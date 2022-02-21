<script lang="ts">
  import { page } from '$app/stores';
  import { PodcastEpisodesPage } from '$lib/pages/podcast-episodes';

  $: podcastID = parseInt($page.params.id, 10);
</script>

{#if !isNaN(podcastID)}
  <PodcastEpisodesPage {podcastID} />
{:else}
  Invalid URL parameter
{/if}
