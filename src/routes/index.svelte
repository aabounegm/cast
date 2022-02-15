<script context="module" lang="ts">
  import AudioControls from 'src/features/audio-controls.svelte';

  export const prerender = true;

  let audio: HTMLAudioElement;
</script>

<svelte:head>
  <title>Home | Cast</title>
</svelte:head>

<section>
  <audio
    bind:this={audio}
    src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3"
  />
  {#if audio}
    <AudioControls {audio} />
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
