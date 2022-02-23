<script lang="ts">
  import IconPlayArrow from '~icons/ic/round-play-arrow';
  import IconPause from '~icons/ic/round-pause';
  import { IconButton } from '$lib/shared/ui';

  export let playing = false;
</script>

<IconButton
  name={playing ? 'Pause' : 'Play'}
  icon={playing ? IconPause : IconPlayArrow}
  class="w-14 h-14 bg-gradient-to-br from-violet-500 to-blue-600 hover:from-violet-400 hover:to-blue-500"
  iconClass="w-7 h-7"
  on:click
/>
