<script lang="ts">
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { MetaImages, PreconnectLink } from '$lib/app';
  import { BottomBar } from '$lib/widgets/bottom-bar';
  import { NowPlaying, nowPlayingActive } from '$lib/widgets/now-playing';
  import { trackAuthStatus, signInSnackbar } from '$lib/features/authenticate';
  import {
    src,
    duration,
    currentTime,
    paused,
    playbackRate,
    buffered,
    reportError,
  } from '$lib/entities/audio';
  import { SnackbarQueue } from '$lib/shared/ui/snackbar';
  import '$lib/app/global-styles.css';

  // Svelte can't handle its own type conversion with TypeScript
  const bufferedNative = buffered as unknown as Writable<TimeRanges>;

  onMount(trackAuthStatus);
  onMount(signInSnackbar);
</script>

<audio
  src={$src}
  bind:duration={$duration}
  bind:currentTime={$currentTime}
  bind:paused={$paused}
  bind:playbackRate={$playbackRate}
  bind:buffered={$bufferedNative}
  on:error={(e) => reportError(e.currentTarget)}
/>

<main class="flex-1 relative margin-auto min-h-full w-full bg-slate-800 text-slate-100">
  <slot />
</main>

{#if $nowPlayingActive}
  <NowPlaying />
{:else}
  <BottomBar on:miniplayer-click={() => nowPlayingActive.set(true)} />
{/if}

<SnackbarQueue />

<svelte:head>
  <MetaImages />
  <PreconnectLink />
</svelte:head>

<style>
  main {
    padding-top: env(safe-area-inset-top);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    padding-bottom: 5rem;
  }
</style>
