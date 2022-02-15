<script lang="ts">
  import AudioControls from 'src/features/audio-controls.svelte';
  import { audio } from 'src/audio-service';

  export const prerender = true;

  $: {
    if (audio)
      audio.src =
        'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3';
  }
</script>

<svelte:head>
  <title>Home | Cast</title>
</svelte:head>

<section />

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
</style>
