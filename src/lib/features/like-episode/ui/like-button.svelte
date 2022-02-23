<script lang="ts">
  import IconFavorite from '~icons/ic/sharp-favorite';
  import IconTwoToneFavorite from '~icons/ic/twotone-favorite';
  import { IconButton } from '$lib/shared/ui';

  export let liked = false;
</script>

<IconButton
  name={liked ? 'Remove the like' : 'Like this episode'}
  class={liked ? 'text-pink-500' : ''}
  icon={liked ? IconFavorite : IconTwoToneFavorite}
  on:click
/>
