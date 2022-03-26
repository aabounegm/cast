<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import IconVideoLibrary from '~icons/ic/twotone-video-library';
  import IconFolderShared from '~icons/ic/twotone-folder-shared';
  import { currentlyPlayingEpisode } from '$lib/entities/episode';
  import BottomBarNavItem from './bottom-bar-nav-item.svelte';
  import MiniPlayer from './mini-player.svelte';

  $: hasAudio = $currentlyPlayingEpisode !== null;

  interface BottomBarEvents {
    'miniplayer-click': void;
  }

  const dispatch = createEventDispatcher<BottomBarEvents>();
</script>

<nav
  class="
    fixed left-0 bottom-0
    flex items-center justify-between
    shadow-lg
    rounded-t-2xl
    bg-slate-700
    text-slate-100
    w-full h-16
  "
  class:has-audio={hasAudio}
>
  <BottomBarNavItem name="Gallery" icon={IconVideoLibrary} href="/" showLabel={!hasAudio} />
  {#if hasAudio}
    <MiniPlayer on:click={() => dispatch('miniplayer-click')} />
  {/if}
  <BottomBarNavItem
    name="Your Library"
    icon={IconFolderShared}
    href="/library"
    showLabel={!hasAudio}
  />
</nav>

<style>
  nav {
    padding: 0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    --preferred-padding: 1.5rem;
  }

  nav.has-audio {
    --preferred-padding: 1.5rem;
  }

  /* Reference: https://webkit.org/blog/7929/designing-websites-for-iphone-x/ */
  @supports (padding: max(0px)) {
    nav {
      padding-left: max(env(safe-area-inset-left), var(--preferred-padding));
      padding-right: max(env(safe-area-inset-right), var(--preferred-padding));
    }
  }
</style>
