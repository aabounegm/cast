<script lang="ts">
  import IconVideoLibrary from '~icons/ic/twotone-video-library';
  import IconFolderShared from '~icons/ic/twotone-folder-shared';
  import { BottomBarNavItem } from '$lib/widgets/bottom-bar';
  import { currentlyPlayingEpisode } from '$lib/entities/episode';
  import MiniPlayer from './mini-player.svelte';

  $: hasAudio = $currentlyPlayingEpisode !== null;
</script>

<div
  class="absolute bottom-0 flex flex-row items-center justify-around shadow-lg rounded-t-2xl bg-slate-700 w-full h-16 px-3"
>
  <BottomBarNavItem
    name="Gallery"
    icon={IconVideoLibrary}
    href="/"
    showLabel={!hasAudio}
    class="grow py-5"
  />
  {#if hasAudio}
    <MiniPlayer />
  {/if}
  <BottomBarNavItem
    name="Your Library"
    icon={IconFolderShared}
    href="/library"
    showLabel={!hasAudio}
    class="grow py-5"
  />
</div>
