<script lang="ts">
  import IconReplay10 from '~icons/ic/round-replay-10';
  import IconForward30 from '~icons/ic/round-forward-30';
  import { seek, move, audio, audioPosition, audioDuration } from '$lib/entities/audio';
  import { IconButton } from '$lib/shared/ui/';
  import PlaybackButton from './playback-button.svelte';
  import { toggleGlobalPlayback } from '../model/toggle-global-playback';
  import ScrubbingBar from './scrubbing-bar.svelte';
</script>

<div class="flex flex-col gap-5">
  <ScrubbingBar
    duration={$audioDuration}
    position={$audioPosition}
    on:scrub={(e) => seek(e.detail.position)}
  />
  <div class="flex flex-row justify-around">
    <IconButton name="Replay the last 10 seconds" icon={IconReplay10} on:click={() => move(-10)} />
    <PlaybackButton playing={!($audio?.paused ?? false)} on:click={toggleGlobalPlayback} />
    <IconButton name="Skip forward 30 seconds" icon={IconForward30} on:click={() => move(30)} />
  </div>
</div>
