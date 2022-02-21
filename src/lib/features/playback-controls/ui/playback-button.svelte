<script lang="ts">
  import IconPlayArrow from '~icons/ic/round-play-arrow';
  import IconPause from '~icons/ic/round-pause';
  import { IconButton } from '$lib/shared/ui';

  export let playing = false;
</script>

<IconButton icon={playing ? IconPause : IconPlayArrow} on:click />
