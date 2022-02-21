<script lang="ts">
  import clsx from 'clsx';
  import { formatDuration } from '$lib/shared/ui';
  import type { Episode } from '$lib/shared/api';

  export let episode: Episode;
</script>

<div
  class={clsx('flex flex-col rounded-2xl bg-slate-700 text-white p-3', episode.favorite && 'border-b-8 border-pink-500 box-border')}
>
  <div class="flex flex-row items-center">
    <p class="flex-1">{episode.title}</p>
    <slot name="play" />
  </div>
  <div class="flex flex-row items-center">
    <p class="text-sm flex-1">
      {formatDuration(episode.duration)} / <slot name="download" />
    </p>
    <slot name="like" />
  </div>
</div>
