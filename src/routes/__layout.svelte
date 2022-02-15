<script lang="ts">
  import '../app.css';
  import AudioControls from 'src/features/audio-controls.svelte';
  import { audio } from 'src/audio-service';
</script>

<main class="margin-auto h-full w-full max-w-md p-4 bg-slate-900 text-white">
  <slot />

  <div class="fixed bottom-0 shadow-lg bg">
    {#if audio}
      <AudioControls />
    {/if}
  </div>
</main>
