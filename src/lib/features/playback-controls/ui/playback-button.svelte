<script lang="ts" context="module">
  export interface PlaybackButtonEvents {
    play: void;
    pause: void;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import IconPlayArrow from '~icons/ic/round-play-arrow';
  import IconPause from '~icons/ic/round-pause';

  import { IconButton } from '$lib/shared/ui';

  export let prominent = false;
  export let playing = false;

  const dispatch = createEventDispatcher<PlaybackButtonEvents>();
</script>

<IconButton
  name={playing ? 'Pause' : 'Play'}
  icon={playing ? IconPause : IconPlayArrow}
  class={prominent
    ? 'w-14 h-14 bg-gradient-to-br from-violet-500 to-blue-600 hover:from-violet-400 hover:to-blue-500'
    : 'w-8 h-8'}
  iconClass={prominent ? 'w-7 h-7' : 'w-6 h-6'}
  on:click={(event) => {
    event.stopPropagation();
    if (playing) {
      dispatch('pause');
    } else {
      dispatch('play');
    }
  }}
/>
