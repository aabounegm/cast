<script lang="ts">
  import type { Writable } from 'svelte/store';
  import IconVideoLibrary from '~icons/ic/twotone-video-library';
  import IconFolderShared from '~icons/ic/twotone-folder-shared';
  import { src, duration, currentTime, paused, playbackRate, buffered } from '$lib/entities/audio';
  import { FullControls } from '$lib/features/playback-controls';
  import { BottomBarNavItem } from '$lib/widgets/bottom-bar';

  // Svelte can't handle its own type conversion with TypeScript
  const bufferedNative = buffered as unknown as Writable<TimeRanges>;

  import '$lib/app.css';

  $: hasAudio = $src !== '';
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
    class="absolute bottom-0 flex flex-row items-center justify-around shadow-lg rounded-t-xl bg-slate-700 w-full h-16 px-3"
  >
    <BottomBarNavItem
      name="Gallery"
      icon={IconVideoLibrary}
      href="/"
      showLabel={!hasAudio}
      class="grow py-5"
    />
    {#if hasAudio}
      <FullControls />
    {/if}
    <BottomBarNavItem
      name="Your Library"
      icon={IconFolderShared}
      href="/library"
      showLabel={!hasAudio}
      class="grow py-5"
    />
  </div>
</main>
