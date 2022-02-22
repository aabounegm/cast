<script lang="ts">
  import IconFavorite from '~icons/ic/sharp-favorite';
  import IconTwoToneFavorite from '~icons/ic/twotone-favorite';
  import { IconButton } from '$lib/shared/ui';
  import { toggleLike, likesStore } from '../model/like';

  export let episodeId: number;

  $: liked = $likesStore.has(episodeId);
</script>

<IconButton
  class={liked ? 'text-pink-500' : ''}
  icon={liked ? IconFavorite : IconTwoToneFavorite}
  on:click={() => toggleLike(episodeId)}
/>
