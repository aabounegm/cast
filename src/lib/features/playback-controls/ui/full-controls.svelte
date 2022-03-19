<script lang="ts">
  import { seek, currentTime, duration, paused, buffered, pause, play } from '$lib/entities/audio';
  import ScrubbingBar from './scrubbing-bar.svelte';
  import clsx from 'clsx';
  import PlaybackControlButtons from './playback-control-buttons.svelte';

  let _class = '';
  export { _class as class };
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
  <PlaybackControlButtons />
</div>
