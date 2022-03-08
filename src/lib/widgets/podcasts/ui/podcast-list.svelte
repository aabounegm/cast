<script lang="ts">
  import { PodcastTile } from '$lib/entities/podcast';
  import { H1 } from '$lib/shared/ui';
  import type { Podcast } from '$lib/shared/types';

  export let title: string | undefined = undefined;
  export let podcasts: Podcast[];
</script>

<section class="pl-8 pr-2 pt-8 grid grid-cols-1 gap-4">
  {#if title !== undefined}
    <H1 class="pl-8 pt-8">{title}</H1>
  {/if}
  {#each podcasts as podcast (podcast.id)}
    <PodcastTile {podcast} />
  {/each}
</section>
