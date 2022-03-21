<script lang="ts">
  import {
    seek,
    currentTime,
    duration,
    buffered,
    pause,
    play,
    playbackRate as speed,
  } from '$lib/entities/audio';
  import ScrubbingBar from './scrubbing-bar.svelte';
  import clsx from 'clsx';
  import PlaybackControlButtons from './playback-control-buttons.svelte';
  import LikeButton from '$lib/features/like-episode/ui/like-button.svelte';
  import type { Episode } from '$lib/shared/api/types';

  let _class = '';
  export { _class as class };
  export let prominent = false;
  export let episode: Episode | undefined;

  function nextSpeed() {
    $speed = ($speed + 0.5) % 2.5;
    if ($speed == 0) $speed = 0.5;
  }
</script>

<div class={clsx('flex flex-col gap-4', _class)}>
  <ScrubbingBar
    duration={$duration}
    position={$currentTime}
    buffered={$buffered}
    on:scrub={(e) => {
      if (e.detail.dragging) pause();
      else play();
      seek(e.detail.position);
    }}
  />
  <PlaybackControlButtons {prominent}>
    <button
      slot="pre"
      name="Toggle playback speed"
      class="flex items-center justify-center w-10 h-10 font-semibold text-sm rounded-full hover:bg-slate-600 active:bg-slate-500"
      on:click={(e) => {
        e.stopPropagation();
        nextSpeed();
      }}
    >
      {$speed.toFixed(1)}x
    </button>
    {#if episode}
      <LikeButton class="w-10 h-10" iconClass="w-6 h-6" {episode} />
    {/if}
  </PlaybackControlButtons>
</div>
