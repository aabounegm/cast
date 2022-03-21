<script lang="ts">
  import { fly } from 'svelte/transition';
  import IconArrowDown from '~icons/ic/round-keyboard-arrow-down';
  import { IconButton } from '$lib/shared/ui';
  import EpisodeDisplay from './episode-display.svelte';
  import { ToggleTranscript } from '$lib/features/read-transcript';
  import type { Episode, Podcast } from '$lib/shared/api';
  import Transcript from './transcript.svelte';
  import {
    seek,
    currentTime,
    duration,
    buffered,
    pause,
    play,
    playbackRate as speed,
  } from '$lib/entities/audio';
  import { createEventDispatcher } from 'svelte';
  import { LikeButton } from '$lib/features/like-episode';
  import { PlaybackControls, ScrubbingBar } from '$lib/features/playback-controls';

  const dispatch = createEventDispatcher<{ minimize: void }>();

  export let podcast: Podcast;
  export let episode: Episode;

  let transcriptShown = false;

  const speedValues = [0.5, 1, 1.5, 2];
  function cyclePlaybackSpeed() {
    const i = speedValues.indexOf($speed);
    $speed = speedValues[(i + 1) % speedValues.length];
  }
</script>

<div
  class="bg-black bg-opacity-20 pt-4 flex flex-col justify-end absolute bottom-0"
  transition:fly={{ y: 100 }}
>
  <div class="bg-slate-800 flex flex-col rounded-t-2xl py-10 px-8 items-center">
    <div class="flex flex-col items-center relative">
      {#if transcriptShown}
        <Transcript class="absolute bg-slate-800 px-0.5" />
      {/if}
      <div class="flex flex-col items-center" class:invisible={transcriptShown}>
        <EpisodeDisplay {episode} {podcast} />
      </div>
    </div>
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
    <div class="w-full mt-5 flex justify-around">
      <button
        name="Toggle playback speed"
        class="flex items-center justify-center w-10 h-10 font-semibold text-sm rounded-full hover:bg-slate-600 active:bg-slate-500"
        on:click={cyclePlaybackSpeed}
      >
        {$speed.toFixed(1)}x
      </button>
      <PlaybackControls prominent />
      <LikeButton class="w-10 h-10" iconClass="w-6 h-6" {episode} />
    </div>
    <div class="w-full mt-4 flex items-center justify-between">
      <ToggleTranscript {transcriptShown} on:click={() => (transcriptShown = !transcriptShown)} />
      <IconButton
        name="Collapse"
        icon={IconArrowDown}
        class="w-10 h-10"
        iconClass="w-8 h-8"
        on:click={() => dispatch('minimize')}
      />
    </div>
  </div>
</div>
