<script lang="ts">
  import { PodcastTile } from '$lib/entities/podcast';
  import { H1 } from '$lib/shared/ui';
  import type { Podcast } from '$lib/shared/api';

  export let title: string | undefined = undefined;
  export let podcasts: Podcast[];
</script>

<section>
  {#if title !== undefined}
    <H1 class="pl-8 pt-8">{title}</H1>
  {/if}
  {#if podcasts.length > 0}
    <div class="flex overflow-x-auto snap-x snap-proximity pl-6 scroll-pl-6">
      {#each podcasts as podcast (podcast.id)}
        <PodcastTile class="snap-start" large {podcast} />
      {/each}
    </div>
  {:else}
    <div class="empty-shelf flex justify-center items-center">Nothing here yet</div>
  {/if}
</section>

<style>
  .empty-shelf {
    height: 172px;
  }
</style>
