<script lang="ts">
  import AudioControls from 'src/features/audio-controls.svelte';

  export const prerender = true;

  import { audio } from 'src/audio-service';
  audio.src =
    'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3';
</script>

<svelte:head>
  <title>Home | Cast</title>
</svelte:head>

<section>
  {#if audio}
    <AudioControls showSeeker={true} {audio} />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
</style>
