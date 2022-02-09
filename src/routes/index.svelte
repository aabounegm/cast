<script context="module" lang="ts">
  import AudioControls from 'src/features/audio-controls.svelte';

  export const prerender = true;
</script>

<script lang="ts">
  import { HomePage } from '$lib/pages/home';
</script>

<svelte:head>
  <title>Home | Cast</title>
</svelte:head>

<HomePage />

<section>
  <span class="material-icons-round"> favorite_border </span>

  <h1 class="text-3xl font-bold underline text-yellow-400">Hello world!</h1>

  <AudioControls />
</section>
