<script lang="ts">
  import { H1, s } from '$lib/shared/ui';
  import type { Podcast } from '$lib/shared/api';

  export let podcast: Podcast;
</script>

<div class="flex flex-row gap-4 pb-6">
  <img class="w-24 h-24 rounded-xl" src={podcast.coverUrl} alt="" />
  <div class="flex flex-col gap-1 text-xs pt-2">
    <H1>{podcast.title}</H1>
    <p>{podcast.author}</p>
    <p>
      {podcast.episodes.length} episode{s(podcast.episodes.length)} / <slot name="download-all" />
    </p>
  </div>
</div>
