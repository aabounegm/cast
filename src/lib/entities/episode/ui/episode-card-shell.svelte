<script lang="ts">
  import clsx from 'clsx';
  import { formatDuration } from '$lib/shared/ui';
  import type { Episode } from '$lib/shared/api';

  export let episode: Episode;
  export let favorite: boolean;
  $: uid = `episode-title-${episode.id}`;
</script>

<article
  class={clsx(
    'flex flex-col rounded-xl bg-background-slightly-higher text-white py-3 px-4',
    favorite && 'border-b-4 border-pink-500 box-border'
  )}
  aria-labelledby={uid}
  {...$$restProps}
>
  <div class="flex items-center pb-1">
    <p class="font-medium text-sm flex-1" id={uid}>{episode.title}</p>
    <slot name="play" />
  </div>
  <div class="flex items-center">
    <p class="text-xs flex-1">
      {formatDuration(episode.duration)} / <slot name="download" />
    </p>
    <slot name="like" />
  </div>
</article>
