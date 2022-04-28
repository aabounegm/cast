<script lang="ts">
  import { SkeletonPodcastTile } from '$lib/entities/podcast';
  import { H1 } from '$lib/shared/ui';

  export let title: string | undefined = undefined;
</script>

<section>
  {#if title !== undefined}
    <H1 class="pl-8 pt-8">{title}</H1>
  {/if}
  <div class="flex overflow-x-auto snap-x snap-proximity pl-6 scroll-pl-6">
    <SkeletonPodcastTile class="snap-start" large />
    <SkeletonPodcastTile class="snap-start" large />
    <SkeletonPodcastTile class="snap-start" large />
  </div>
</section>
