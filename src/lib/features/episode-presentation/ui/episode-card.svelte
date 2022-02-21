<script lang="ts">
  import { formatDuration } from '$lib/shared/ui';
  import type { PodcastEpisode } from 'src/podcast';
  import DownloadLink from './download-link.svelte';

  export let liked = false;
  export let selected = false;
  export let episode: PodcastEpisode;
  export let downloadingPercentage: number | undefined = undefined;
  export let onClickDownload: (() => void) | undefined = undefined;
  export let onClickPlay: (() => void) | undefined = undefined;

  $: time = formatDuration(episode.duration);

  function toggleLike() {
    liked = !liked;
  }
</script>

<div
  class="flex flex-col rounded-2xl bg-slate-700 text-white p-3 {selected
    ? 'border-b-8 border-pink-500 box-border'
    : ''}"
>
  <div class="flex flex-row items-center">
    <p class="flex-1">{episode.description}</p>
    <button class="material-icons-round" on:click={onClickPlay}> play_arrow </button>
  </div>
  <div class="flex flex-row items-center">
    <p class="text-sm flex-1">
      {time} /
      <DownloadLink percentage={downloadingPercentage} {onClickDownload} />
    </p>
    {#if liked}
      <button class="material-icons-round text-pink-500" on:click={toggleLike}> favorite </button>
    {:else}
      <button class="material-icons-round" on:click={toggleLike}> favorite_border </button>
    {/if}
  </div>
</div>

<style lang="postcss">
  .material-icons-round {
    @apply text-xl;
  }
  button {
    @apply flex items-center justify-center w-8 h-8 rounded-full;
  }
  button:hover {
    @apply bg-slate-600;
  }
  button:active {
    @apply bg-slate-500;
  }
</style>
