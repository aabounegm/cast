<script lang="ts">
  import { onMount } from 'svelte';
  import IconVideoLibrary from '~icons/ic/twotone-video-library';
  import IconFolderShared from '~icons/ic/twotone-folder-shared';
  import { src, duration, currentTime, paused, playbackRate } from '$lib/entities/audio';
  import { IconButton } from '$lib/shared/ui';

  import '$lib/app.css';
</script>

<audio
  src={$src}
  bind:duration={$duration}
  bind:currentTime={$currentTime}
  bind:paused={$paused}
  bind:playbackRate={$playbackRate}
/>
<main class="relative margin-auto h-full w-full max-w-md bg-slate-800 text-white">
  <slot />
  <div
    class="absolute bottom-0 flex flex-row items-center shadow-lg rounded-t-xl bg-slate-700 w-max max-w-md"
  >
    <IconButton name="Podcast Gallery" icon={IconVideoLibrary} />
    <IconButton name="Your Library" icon={IconFolderShared} href="/library" />
  </div>
</main>
