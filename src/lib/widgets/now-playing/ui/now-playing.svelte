<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import type { Episode, Podcast } from '$lib/shared/api';
  import { ToggleTranscript, Transcript } from '$lib/features/read-transcript';
  import IconArrowDown from '~icons/ic/round-keyboard-arrow-down';
  import { FullControls } from '$lib/features/playback-controls';
  import { IconButton } from '$lib/shared/ui';
  import EpisodeDisplay from './episode-display.svelte';
  import SwipeDownBar from './swipe-down-bar.svelte';

  const dispatch = createEventDispatcher<{ minimize: void }>();

  export let podcast: Podcast;
  export let episode: Episode;

  let transcriptShown = false;

  let yDiff = 0;
</script>

<div
  class="absolute bottom-0 h-screen w-full bg-black bg-opacity-30 pt-14 flex flex-col justify-end"
  transition:fly={{ y: 100 }}
>
  <div
    class="relative h-full bg-slate-800 flex flex-col rounded-t-2xl py-10 px-8 items-center"
    style:transform={`translateY(${yDiff}px)`}
  >
    <SwipeDownBar {yDiff} on:minimize={() => dispatch('minimize')} />

    <div class="w-full flex flex-col flex-grow items-center relative">
      {#if transcriptShown}
        <Transcript {episode} class="absolute top-0 left-0 w-full h-full bg-slate-800 px-0.5" />
      {:else}
        <EpisodeDisplay {episode} {podcast} />
      {/if}
    </div>
    <FullControls class="w-full mt-5" />
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
