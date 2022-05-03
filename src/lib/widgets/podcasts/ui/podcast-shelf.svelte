<script lang="ts">
  import { PodcastTile } from '$lib/entities/podcast';
  import { H1 } from '$lib/shared/ui';
  import type { Podcast } from '$lib/shared/api';

  export let id: string;
  export let title: string | undefined = undefined;
  export let podcasts: Podcast[];
</script>

<div>
  {#if title !== undefined}
    <H1 class="pl-8 pt-8" {id}>{title}</H1>
  {/if}
  <section
    class="flex overflow-x-auto snap-x snap-proximity pl-6 scroll-pl-6"
    role="feed"
    aria-labelledby={id}
  >
    {#each podcasts as podcast (podcast.id)}
      <PodcastTile class="snap-start" large {podcast} aria-setsize={podcasts.length} />
    {/each}
  </section>
</div>
