<script context="module" lang="ts">
  import AudioControls from 'src/features/audio-controls.svelte';

  export const prerender = true;
</script>

<svelte:head>
  <title>Home | Cast</title>
</svelte:head>

<section>
  <AudioControls
    src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3"
  />
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
