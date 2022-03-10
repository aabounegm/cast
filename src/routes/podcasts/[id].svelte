<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { podcastGet } from '$lib/entities/podcast';

  export const load: Load = async ({ params }) => {
    try {
      const podcast = await podcastGet(parseInt(params.id, 10));
      return { props: { podcast } };
    } catch (e) {
      console.error(e);
      return { props: { podcast: undefined } };
    }
  };
</script>

<script lang="ts">
  import { PodcastEpisodesPage } from '$lib/pages/podcast-episodes';
  import type { Podcast } from '$lib/shared/api';

  export let podcast: Podcast | undefined;
</script>

{#if podcast !== undefined}
  <PodcastEpisodesPage {podcast} />
{:else}
  Invalid URL parameter
{/if}
