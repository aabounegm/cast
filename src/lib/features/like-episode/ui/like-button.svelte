<script lang="ts">
  import clsx from 'clsx';
  import IconFavorite from '~icons/ic/sharp-favorite';
  import IconTwoToneFavorite from '~icons/ic/twotone-favorite';
  import { IconButton } from '$lib/shared/ui';

  export let liked = false;
</script>

<IconButton
  name={liked ? 'Remove the like' : 'Like this episode'}
  class={clsx('w-6 h-6', liked && 'text-pink-500')}
  icon={liked ? IconFavorite : IconTwoToneFavorite}
  iconClass="w-4 h-4"
  on:click
/>
