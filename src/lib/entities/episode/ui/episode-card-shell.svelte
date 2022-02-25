<script lang="ts">
  import clsx from 'clsx';
  import { formatDuration } from '$lib/shared/ui';
  import type { Episode } from '$lib/shared/api';

  export let episode: Episode;
</script>

<div
  class={clsx(
    'flex flex-col rounded-xl bg-background-slightly-higher text-white py-3 px-4',
    episode.favorite && 'border-b-4 border-pink-500 box-border'
  )}
  data-cy="episode-card"
>
  <div class="flex items-center pb-1">
    <p class="font-medium text-sm flex-1" data-cy="episode-title">{episode.title}</p>
    <slot name="play" />
  </div>
  <div class="flex items-center">
    <p class="text-xs flex-1">
      {formatDuration(episode.duration)} / <slot name="download" />
    </p>
    <slot name="like" />
  </div>
</div>
