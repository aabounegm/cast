<script>
  import { paused, move } from '$lib/entities/audio';
  import { toggleGlobalPlayback } from '..';
  import { IconButton } from '$lib/shared/ui/';
  import PlaybackButton from './playback-button.svelte';
  import IconReplay10 from '~icons/ic/round-replay-10';
  import IconForward30 from '~icons/ic/round-forward-30';

  export let prominent = false;
</script>

<div class="flex flex-row items-center justify-between">
  <IconButton
    name="Replay the last 10 seconds"
    icon={IconReplay10}
    class="w-9 h-9"
    iconClass="w-7 h-7"
    on:click={(e) => {
      e.stopPropagation();
      move(-10);
    }}
  />
  <PlaybackButton {prominent} playing={!$paused} on:click={() => toggleGlobalPlayback()} />
  <IconButton
    name="Skip forward 30 seconds"
    icon={IconForward30}
    class="w-9 h-9"
    iconClass="w-7 h-7"
    on:click={(e) => {
      e.stopPropagation();
      move(30);
    }}
  />
</div>
