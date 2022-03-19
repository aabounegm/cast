<script lang="ts">
  import { fly } from 'svelte/transition';
  import { FullControls } from '$lib/features/playback-controls';
  import IconArrowDown from '~icons/ic/round-keyboard-arrow-down';
  import { IconButton } from '$lib/shared/ui';
  import EpisodeDisplay from './episode-display.svelte';
  import { ToggleTranscript, Transcript } from '$lib/features/read-transcript';
  import type { Episode, Podcast } from '$lib/shared/api';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ minimize: void }>();

  export let podcast: Podcast;
  export let episode: Episode;

  let transcriptShown = false;
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
