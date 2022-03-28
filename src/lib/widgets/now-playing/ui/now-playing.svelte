<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import IconArrowDown from '~icons/ic/round-keyboard-arrow-down';
  import { ToggleTranscript, Transcript } from '$lib/features/read-transcript';
  import { PlaybackControls, ScrubbingBar } from '$lib/features/playback-controls';
  import {
    seek,
    currentTime,
    duration,
    buffered,
    pause,
    play,
    playbackRate as speed,
  } from '$lib/entities/audio';
  import { currentlyPlayingEpisode } from '$lib/entities/episode';
  import { LikeButton } from '$lib/features/like-episode';
  import { IconButton } from '$lib/shared/ui';
  import EpisodeDisplay from './episode-display.svelte';
  import { nowPlayingActive } from '../model/now-playing-active';
  import { lockScrollWhileMounted } from '../lib/lock-scroll-while-mounted';
  import SwipeDownBar from './swipe-down-bar.svelte';

  let transcriptShown = false;

  const speedValues = [0.5, 1, 1.5, 2];
  function cyclePlaybackSpeed() {
    const i = speedValues.indexOf($speed);
    $speed = speedValues[(i + 1) % speedValues.length];
  }

  onMount(lockScrollWhileMounted);
</script>

{#if $currentlyPlayingEpisode !== null}
  <div
    class="bg-black bg-opacity-20 flex flex-col justify-end fixed bottom-0 left-0 h-screen"
    transition:fade
  >
    <div
      class="
        panel
        bg-slate-800 text-slate-100
        flex flex-col
        rounded-t-2xl
        py-6 px-8
      "
      transition:fly={{ y: 100 }}
    >
      <div class="flex flex-col items-center relative mb-5">
        {#if transcriptShown}
          <Transcript
            episode={$currentlyPlayingEpisode}
            class="absolute top-0 left-0 w-full h-full bg-slate-800 px-0.5"
          />
        {/if}
        <div class="flex flex-col items-center" class:invisible={transcriptShown}>
          <SwipeDownBar on:minimize={() => nowPlayingActive.set(false)} />
          <EpisodeDisplay episode={$currentlyPlayingEpisode} />
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
      <div class="w-full mt-4 flex items-center justify-between">
        <button
          name="Cycle playback speed"
          class="flex items-center justify-center w-10 h-10 font-semibold text-sm rounded-full hover:bg-slate-600 active:bg-slate-500"
          on:click={cyclePlaybackSpeed}
        >
          {$speed.toFixed(1)}x
        </button>
        <PlaybackControls />
        <LikeButton class="w-10 h-10" iconClass="w-7 h-7" episode={$currentlyPlayingEpisode} />
      </div>
      <div class="w-full mt-4 flex items-center justify-between">
        <ToggleTranscript {transcriptShown} on:click={() => (transcriptShown = !transcriptShown)} />
        <IconButton
          name="Collapse"
          icon={IconArrowDown}
          class="w-12 h-12"
          iconClass="w-8 h-8"
          on:click={() => nowPlayingActive.set(false)}
        />
      </div>
    </div>
  </div>
{/if}

<style>
  .panel {
    max-height: 90%;
  }
</style>
