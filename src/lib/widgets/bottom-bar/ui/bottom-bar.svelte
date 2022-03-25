<script lang="ts">
  import IconVideoLibrary from '~icons/ic/twotone-video-library';
  import IconFolderShared from '~icons/ic/twotone-folder-shared';
  import { currentlyPlayingEpisode } from '$lib/entities/episode';
  import BottomBarNavItem from './bottom-bar-nav-item.svelte';
  import MiniPlayer from './mini-player.svelte';

  $: hasAudio = $currentlyPlayingEpisode !== null;
</script>

<nav
  class="
    fixed left-0 bottom-0
    flex flex-row items-center justify-around
    shadow-lg
    rounded-t-2xl
    bg-slate-700
    text-slate-100
    w-full h-16
    px-3
  "
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
</nav>

<style>
  nav {
    padding: 0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  }

  /* Reference: https://webkit.org/blog/7929/designing-websites-for-iphone-x/ */
  @supports (padding: max(0px)) {
    nav {
      padding-left: max(env(safe-area-inset-left), 0.75rem);
      padding-right: max(env(safe-area-inset-right), 0.75rem);
    }
  }
</style>
