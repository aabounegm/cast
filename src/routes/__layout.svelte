<script lang="ts">
  import '../app.css';
  import AudioControls from 'src/features/audio-controls.svelte';
  import { audio } from 'src/audio-service';
</script>

<main class="relative margin-auto h-full w-full max-w-md p-4 bg-slate-900 text-white">
  <slot />

  <div
    class="absolute bottom-0 flex flex-row items-center shadow-lg rounded-t-xl bg-slate-700 w-max max-w-md"
  >
    <button class="material-icons-round icon-button">
      <span class="material-icons-round"> video_library </span>
    </button>
    {#if $audio?.src}
      <AudioControls />
    {/if}
    <button class="material-icons-round icon-button">
      <span class="material-icons-round"> folder_shared </span>
    </button>
  </div>
</main>
