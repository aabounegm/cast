<script lang="ts">
  import clsx from 'clsx';
  import IconFavorite from '~icons/ic/sharp-favorite';
  import IconTwoToneFavorite from '~icons/ic/twotone-favorite';
  import { IconButton } from '$lib/shared/ui';
  import type { Episode } from '$lib/shared/api';
  import { toggleLike, likesStore } from '../model/like';

  export let episode: Episode;
  let _class = 'w-6 h-6';
  export { _class as class };
  export let iconClass = 'w-4 h-4';

  $: liked = $likesStore.has(episode.id);
</script>

<IconButton
  name={liked ? 'Remove the like' : 'Like this episode'}
  class={clsx(_class, liked && 'text-pink-500')}
  icon={liked ? IconFavorite : IconTwoToneFavorite}
  aria-pressed={liked}
  on:click={() => toggleLike(episode)}
  {iconClass}
/>
