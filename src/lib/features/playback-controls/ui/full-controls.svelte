<script lang="ts">
  import IconReplay10 from '~icons/ic/round-replay-10';
  import IconForward30 from '~icons/ic/round-forward-30';
  import { seek, move, currentTime, duration, paused, buffered } from '$lib/entities/audio';
  import { IconButton } from '$lib/shared/ui/';
  import PlaybackButton from './playback-button.svelte';
  import { toggleGlobalPlayback } from '../model/toggle-global-playback';
  import ScrubbingBar from './scrubbing-bar.svelte';
  import clsx from 'clsx';

  let _class = '';
  export { _class as class };
</script>

<div class={clsx('flex flex-col gap-4', _class)}>
  <ScrubbingBar
    duration={$duration}
    position={$currentTime}
    buffered={$buffered}
    on:scrub={(e) => seek(e.detail.position)}
  />
  <div class="flex flex-row items-center justify-between">
    <IconButton
      name="Replay the last 10 seconds"
      icon={IconReplay10}
      class="w-9 h-9"
      iconClass="w-7 h-7"
      on:click={() => move(-10)}
    />
    <PlaybackButton prominent playing={!$paused} on:click={toggleGlobalPlayback} />
    <IconButton
      name="Skip forward 30 seconds"
      icon={IconForward30}
      class="w-9 h-9"
      iconClass="w-7 h-7"
      on:click={() => move(30)}
    />
  </div>
</div>
