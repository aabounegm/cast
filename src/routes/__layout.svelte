<script lang="ts">
  import type { Writable } from 'svelte/store';
  import IconVideoLibrary from '~icons/ic/twotone-video-library';
  import IconFolderShared from '~icons/ic/twotone-folder-shared';
  import { src, duration, currentTime, paused, playbackRate, buffered } from '$lib/entities/audio';
  import { FullControls } from '$lib/features/playback-controls';
  import { IconButton } from '$lib/shared/ui';

  // Svelte can't handle its own type conversion with TypeScript
  const bufferedNative = buffered as unknown as Writable<TimeRanges>;

  import '$lib/app.css';
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
  <div
    class="absolute bottom-0 flex flex-row items-center shadow-lg rounded-t-xl bg-slate-700 w-max max-w-md"
  >
    <IconButton name="Podcast Gallery" icon={IconVideoLibrary} />
    <FullControls />
    <IconButton name="Your Library" icon={IconFolderShared} href="/library" />
  </div>
</main>
