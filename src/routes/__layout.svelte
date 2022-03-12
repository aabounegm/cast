<script lang="ts">
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { BottomBar } from '$lib/widgets/bottom-bar';
  import { trackAuthStatus } from '$lib/features/authenticate';
  import { src, duration, currentTime, paused, playbackRate, buffered } from '$lib/entities/audio';
  import '$lib/app.css';

  // Svelte can't handle its own type conversion with TypeScript
  const bufferedNative = buffered as unknown as Writable<TimeRanges>;

  onMount(trackAuthStatus);
</script>

<audio
  src={$src}
  bind:duration={$duration}
  bind:currentTime={$currentTime}
  bind:paused={$paused}
  bind:playbackRate={$playbackRate}
  bind:buffered={$bufferedNative}
/>
<main class="relative margin-auto h-full w-full max-w-md bg-slate-800 text-white">
  <slot />
  <BottomBar />
</main>
