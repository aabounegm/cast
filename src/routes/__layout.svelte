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
  <main class="relative margin-auto h-full w-full max-w-md p-4 bg-slate-800 text-white">
    <slot />

    <div
      class="absolute bottom-0 flex flex-row items-center shadow-lg rounded-t-xl bg-slate-700 w-max max-w-md"
    >
      <IconButton name="Podcast Gallery" icon={IconVideoLibrary} />
      <FullControls />
      <IconButton name="Your Library" icon={IconFolderShared} href="/library" />
    </div>
  </main>
{/if}
