<script lang="ts">
  import IconFavorite from '~icons/ic/sharp-favorite';
  import IconTwoToneFavorite from '~icons/ic/twotone-favorite';
  import { IconButton } from '$lib/shared/ui';
  import type { Episode } from '$lib/shared/api';
  import { toggleLike, likesStore } from '../model/like';

  export let episode: Episode;

  $: liked = $likesStore.has(episode.id);
</script>

<IconButton
  class={liked ? 'text-pink-500' : ''}
  icon={liked ? IconFavorite : IconTwoToneFavorite}
  on:click={() => toggleLike(episode)}
/>
