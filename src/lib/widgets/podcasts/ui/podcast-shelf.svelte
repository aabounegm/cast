<script lang="ts">
  import { PodcastTile } from '$lib/entities/podcast';
  import { H1 } from '$lib/shared/ui';
  import type { Podcast } from '$lib/shared/types';

  export let title: string | undefined = undefined;
  export let podcasts: Podcast[];
</script>

<section>
  {#if title !== undefined}
    <H1 class="pl-8 pt-8">{title}</H1>
  {/if}
  <div class="flex overflow-x-scroll snap-x snap-proximity pl-6 scroll-pl-6">
    {#each podcasts as podcast (podcast.id)}
      <PodcastTile class="snap-start" large {podcast} />
    {/each}
  </div>
</section>
