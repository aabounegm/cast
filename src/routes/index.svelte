<script context="module" lang="ts">
  import AudioControls from 'src/features/audio-controls.svelte';

  export const prerender = true;
</script>

<svelte:head>
  <title>Home | Cast</title>
</svelte:head>

<section>
  <h1>
    <div class="welcome">
      <picture>
        <source srcset="svelte-welcome.webp" type="image/webp" />
        <img src="svelte-welcome.png" alt="Welcome" />
      </picture>
    </div>
  </h1>

  <span class="material-icons-round"> favorite_border </span>

  <h1 class="text-3xl font-bold underline text-yellow-400">Hello world!</h1>

  <AudioControls />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
