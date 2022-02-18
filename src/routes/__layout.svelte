<script lang="ts">
  import '../app.css';
  import AudioControls from 'src/features/playback-controls/ui/controls.svelte';
  import { audio as player, initAudio, play } from 'src/entities/audio/model/audio-instance';
  import { onMount, tick } from 'svelte';

  let audio: HTMLAudioElement;
  onMount(async () => {
    initAudio(audio);
    await tick();
    play('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  });
</script>

<audio autoplay muted bind:this={audio} />

{#if $player}
  <main class="relative margin-auto h-full w-full max-w-md p-4 bg-slate-900 text-white">
    <slot />

    <div
      class="absolute bottom-0 flex flex-row items-center shadow-lg rounded-t-xl bg-slate-700 w-max max-w-md"
    >
      <button class="material-icons-round icon-button">
        <span class="material-icons-round"> video_library </span>
      </button>
      {#if $player.src}
        <AudioControls />
      {/if}
      <button class="material-icons-round icon-button">
        <span class="material-icons-round"> folder_shared </span>
      </button>
    </div>
  </main>
{/if}
