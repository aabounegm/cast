<script lang="ts">
  import IconReplay10 from '~icons/ic/round-replay-10';
  import IconForward30 from '~icons/ic/round-forward-30';
  import { PlaybackButton, toggleGlobalPlayback } from '$lib/features/playback-controls';
  import { IconButton } from '$lib/shared/ui';
  import { move, paused } from '$lib/entities/audio';

  export let coverArt: string = '';
</script>

<div class="flex justify-between">
  <img src={coverArt} alt="" />
  <div class="flex justify-between">
    <IconButton
      name="Replay the last 10 seconds"
      icon={IconReplay10}
      class="w-9 h-9"
      iconClass="w-7 h-7"
      on:click={() => move(-10)}
    />
    <PlaybackButton playing={!$paused} on:click={() => toggleGlobalPlayback()} />
    <IconButton
      name="Skip forward 30 seconds"
      icon={IconForward30}
      class="w-9 h-9"
      iconClass="w-7 h-7"
      on:click={() => move(30)}
    />
  </div>
</div>
