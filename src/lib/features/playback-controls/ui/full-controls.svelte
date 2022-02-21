<script lang="ts">
  import IconReplay10 from '~icons/ic/round-replay-10'
  import IconForward30 from '~icons/ic/round-forward-30'
  import { seek, move, audio } from '$lib/entities/audio';
  import { IconButton } from '$lib/shared/ui/';
  import PlaybackButton from './playback-button.svelte';
  import { toggleGlobalPlayback } from '../model/toggle-global-playback';

  $: percent = (100 * $audio.currentTime) / $audio.duration;
</script>

<div class="flex flex-col gap-5">
  <input
    type="range"
    min="0"
    max="100"
    value={percent}
    on:input={(e) => seek(parseInt(e.currentTarget.value))}
  />
  <div class="flex flex-row justify-around">
    <IconButton icon={IconReplay10} on:click={() => move(-10)} />
    <PlaybackButton playing={!$audio.paused} on:click={toggleGlobalPlayback} />
    <IconButton icon={IconForward30} on:click={() => move(30)} />
  </div>
</div>
