<script lang="ts">
  import { onMount } from 'svelte';
  import IconVideoLibrary from '~icons/ic/twotone-video-library';
  import IconFolderShared from '~icons/ic/twotone-folder-shared';
  import { FullControls } from '$lib/features/playback-controls';
  import { audio } from '$lib/entities/audio';
  import { IconButton } from '$lib/shared/ui';

  import '$lib/app.css';

  onMount(() => {
    audio.set(new Audio());
  });
</script>

{#if $audio}
  <main class="relative margin-auto h-full w-full max-w-md bg-slate-800 text-white">
    <slot />

    <div
      class="absolute bottom-0 flex flex-row items-center justify-around shadow-lg rounded-t-xl bg-slate-700 w-full h-16"
    >
      <IconButton
        name="Gallery"
        icon={IconVideoLibrary}
        href="/"
        showLabel={$audio.readyState === $audio.HAVE_NOTHING}
        class="grow py-5"
      />
      {#if $audio.readyState > $audio.HAVE_NOTHING}
        <FullControls />
      {/if}
      <IconButton
        name="Your Library"
        icon={IconFolderShared}
        href="/library"
        showLabel={$audio.readyState === $audio.HAVE_NOTHING}
        class="grow py-5"
      />
    </div>
  </main>
{/if}
