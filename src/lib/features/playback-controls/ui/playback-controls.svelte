<script>
  import { paused, move, play, pause } from '$lib/entities/audio';
  import { IconButton } from '$lib/shared/ui/';
  import PlaybackButton from './playback-button.svelte';
  import IconReplay10 from '~icons/ic/round-replay-10';
  import IconForward30 from '~icons/ic/round-forward-30';
</script>

<div class="flex items-center w-1/2 justify-between">
  <IconButton
    name="Replay the last 10 seconds"
    icon={IconReplay10}
    class="w-10 h-10"
    iconClass="w-7 h-7"
    on:click={(e) => {
      e.stopPropagation();
      move(-10);
    }}
  />
  <PlaybackButton prominent playing={!$paused} on:play={play} on:pause={pause} />
  <IconButton
    name="Skip forward 30 seconds"
    icon={IconForward30}
    class="w-10 h-10"
    iconClass="w-7 h-7"
    on:click={(e) => {
      e.stopPropagation();
      move(30);
    }}
  />
</div>
