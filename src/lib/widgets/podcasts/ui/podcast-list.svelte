<script lang="ts">
  import { PodcastTile } from '$lib/entities/podcast';
  import { H1 } from '$lib/shared/ui';
  import type { Podcast } from '$lib/shared/api';

  export let id: string;
  export let title: string | undefined = undefined;
  export let podcasts: Podcast[];
</script>

<section>
  {#if title !== undefined}
    <H1 class="pl-8 pt-8" {id}>{title}</H1>
  {/if}
  <section role="feed" aria-labelledby={id} class="pl-6 pr-2 grid grid-cols-1">
    {#each podcasts as podcast (podcast.id)}
      <PodcastTile {podcast} aria-setsize={podcasts.length} />
    {/each}
  </section>
</section>
